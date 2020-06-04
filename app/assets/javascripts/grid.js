$(document).on('turbolinks:load', function () {
    var img_url = $('#url').val();
    var w = $('#width').val();
    var h = $('#height').val();
    $('#canvas').attr('width', w);
    $('#canvas').attr('height', h);
    var canvas = $('#canvas')[0];

    if (canvas.getContext) { // 未サポートブラウザでの実行を抑止
        var ctx = canvas.getContext('2d');
        var img = new Image();

        ctx.lineWidth = Number($('#grid-size').val());
        var gap = Number($('#grid-gap').val());
        ctx.strokeStyle = $('#grid-color').val();

        // ページ読み込み完了時の描画
        $(img).on('load', function () {
            ctx.drawImage(img, 0, 0);
            drawGrid();
            $('#output').attr('src', canvas.toDataURL('image/jpeg'));
        });

        img.src = img_url;

        // 線の太さを変える
        $('#grid-size').change(function () {
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0);
            ctx.lineWidth = Number($(this).val());
            drawGrid();
            $('#output').attr('src', canvas.toDataURL('image/jpeg'));
        });

        // 線の間隔を変える
        $('#grid-gap').change(function () {
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0);
            gap = Number($(this).val());
            drawGrid();
            $('#output').attr('src', canvas.toDataURL('image/jpeg'));
        });

        // 線の色を変える
        $('#grid-color').change(function () {
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0);
            ctx.strokeStyle = $(this).val();
            drawGrid();
            $('#output').attr('src', canvas.toDataURL('image/jpeg'));
        });

        $("#download").click(function () {
            saveCanvas();
        });

        // グリッドの描画
        function drawGrid() {
            for (var i = 0; i < w/2; i += gap) {
                ctx.beginPath();
                ctx.moveTo(w / 2 + i, 0);
                ctx.lineTo(w / 2 + i, h);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(w / 2 - i, 0);
                ctx.lineTo(w / 2 - i, h);
                ctx.stroke();
            }

            for (var j = 0; j < h/2; j += gap) {
                ctx.beginPath();
                ctx.moveTo(0, h / 2 + j);
                ctx.lineTo(w, h / 2 + j);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, h / 2 - j);
                ctx.lineTo(w, h / 2 - j);
                ctx.stroke();
            }
        }

        // Base64データをBlobデータに変換
        function base64ToBlob (base64) {
            var bin = atob(base64.replace(/^.*,/, ''));
            var buffer = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }
            var blob = new Blob([buffer.buffer], { type: 'image/png' });
            return blob;
        }

        // キャンバスを画像化して保存
        function saveCanvas () {
            var extension = $('input[name=extension]:checked').val();
            var canvas = $('#canvas').get(0);
            var base64 = canvas.toDataURL('image/jpeg');
            if (canvas.msToBlob) { // IE対応
                if (extension === 'png') {
                    var blob = canvas.msToBlob();
		            window.navigator.msSaveBlob(blob, 'download.png');
                } else {
                    var blob = base64ToBlob(base64);
                    window.navigator.msSaveBlob(blob, 'download.jpg');
                }
            } else {
                var a = document.createElement('a');
                if (extension === 'png') {
                    a.href = canvas.toDataURL();
                    a.download = 'download.png';
                } else {
                    a.href = base64;
                    a.download = 'download.jpg';
                }
                a.click();
            }
        }
    }
});