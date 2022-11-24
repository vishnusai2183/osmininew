var blocks = [];
var filled = [];
var totalsize;
var numblocks;

var submitBtn = document.querySelector('#submitBtn');
//console.log('Welcome!');
submitBtn.onclick = getInitValues;

function getInitValues() {
  for (i = 0; i < numblocks; i++)
    filled[i] = 0
  totalsize = document.querySelector('#totalMemSize').value;
  numblocks = document.querySelector('#numBlocks').value;
  var message = 'Read totalsize =' + totalsize + ' and numblocks = ' + numblocks;

  var template = "<label class='col-form-label'>Block Sizes</label>"
  var i;
  for (i = 0; i < numblocks; i++) {
    template = template + "<input class='form-control' type='text' class='blockInput' id='blockSize" + i + "'>";
  }
  template += "<button id='submitBlockBtn' class='btn btn-primary' style='margin-top: 36px'>Submit</button>";
  if (numblocks > 0)
    render(template, document.querySelector('#blockContainer'));
  else
    render('number of blocks is a mandatory field', document.querySelector('#requestMsg'));

  var submitBlockBtn = document.querySelector('#submitBlockBtn');

  var blocksize0 = document.querySelector('#blockSize0');

  var i = 0;
  var blockSizeBtn = document.querySelector('#submitBlockBtn');
  blockSizeBtn.onclick = getBlockSizes;

  function getBlockSizes() {
    i = 0;
    var flag = 0;
    for (i = 0; i < numblocks; i++) {
      blockSize = document.querySelector('#blockSize' + i).value;
      if (parseInt(blockSize) < 0)
        flag++;
      if (blockSize == 0) {
        render("A block size cannot have zero size", document.querySelector('#requestMsg'));
        flag++;
      }
      blocks[i] = blockSize
      filled[i] = 0;
      console.log(blockSize);
      console.log(filled[i]);
    }
    if (parseInt(flag))
      render("Block size cannot be zero or negative", document.querySelector('#requestMsg'));
    else {
      //check if blocksizes don't exceed the total size
      var blockSum = 0;
      for (i = 0; i < numblocks; i++)
        blockSum += parseInt(blocks[i]);
      console.log(blockSum);
      console.log(totalsize);
      if (blockSum > totalsize)
        render('Re-enter correct block sizes.', document.querySelector('#requestMsg'));
      else
        render('Blocks created', document.querySelector('#requestMsg'));
      var requestBtn = document.querySelector('#submitRequestBtn');
      requestBtn.onclick = handleRequest;

      var removeBtn = document.querySelector('#removeBtn');
      removeBtn.onclick = handleRemove;
    }

    function handleRequest() {

      var alloc = -1;
      var requestSize = document.querySelector('#requestSize').value;
      if (parseInt(requestSize) < 0)
        render("Please give a valid request", document.querySelector('#requestMsg'));
      else if (document.getElementById("FF").checked == true) {
        for (i = 0; i < numblocks; i++) {
          //perform a first fit request
          //console.log(blocks[i]);
          //console.log(filled[i]);
          if (parseInt(blocks[i]) >= parseInt(requestSize) && filled[i] == 0) {
            filled[i] = 1;
            render('block ' + (i + 1) + ' used for the request', document.querySelector('#requestMsg'));
            var blck = document.querySelector('#blockSize' + i);
            // console.log(blck.setAttribute('color':"green") );
            // var blck = document.getElementById('#blockSize' + i);

            blck.setAttribute("style", "background-color:#82e0c4");
            console.log("manan")

            alloc = i;
            break;
          }
        }
      } else if (document.getElementById("BF").checked == true) {
        var t = 10000;
        var k;

        for (i = 0; i < numblocks; i++) {

          if (parseInt(blocks[i]) >= parseInt(requestSize) && t > parseInt(blocks[i]) && filled[i] == 0) {

            t = parseInt(blocks[i]);
            k = i;

            // break;
          }
        }
        filled[k] = 1;
        render('block ' + (k + 1) + ' used for the request BF', document.querySelector('#requestMsg'));
        var blck = document.querySelector('#blockSize' + k);
        // console.log(blck.setAttribute('color':"green") );
        // var blck = document.getElementById('#blockSize' + i);

        blck.setAttribute("style", "background-color:#82e0c4");
        console.log("manan")

        alloc = i;

      } else if (document.getElementById("WF").checked == true) {
        var t = -1;
        var k;

        for (i = 0; i < numblocks; i++) {

          if (parseInt(blocks[i]) >= parseInt(requestSize) && t < parseInt(blocks[i]) && filled[i] == 0) {

            t = parseInt(blocks[i]);
            k = i;

            // break;
          }
        }
        filled[k] = 1;
        render('block ' + (k + 1) + ' used for the request BF', document.querySelector('#requestMsg'));
        var blck = document.querySelector('#blockSize' + k);
        // console.log(blck.setAttribute('color':"green") );
        // var blck = document.getElementById('#blockSize' + i);

        blck.setAttribute("style", "background-color:#82e0c4");
        console.log("manan")

        alloc = i;

      }

      if (alloc == -1)
        render("Appropriate block is not available at this time", document.querySelector('#requestMsg'));
    }

    function handleRemove() {
      var remove = document.querySelector('#removeNum').value;
      if (parseInt(remove) > numblocks || parseInt(remove) < 0 || filled[(parseInt(remove) - 1)] == 0) {
        render("already empty or invalid block", document.querySelector('#requestMsg'));
      } else {
        filled[(parseInt(remove) - 1)] = 0;
        render('block has been cleared ' + (remove), document.querySelector('#requestMsg'));
        var blck = document.querySelector('#blockSize' + (parseInt(remove) - 1));
        blck.setAttribute("style", "background-color:white");
      }
    }
  }
}

function render(template, node) {
  if (!node)
    return;
  node.innerHTML = template;
}
