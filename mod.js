Game.registerMod("custom_cookie_adder", {
    init: function() {
        Game.Notify("Custom Cookie Adder", "メニューからクッキーを追加できます！", [16,5]);
        Game.customOptionsMenu.push(function() {
            return `
                <div style="padding:10px; margin:10px; background:#444; border-radius:8px; color:white;">
                    <h3 style="margin:5px 0;">🍪 Custom Cookie Adder</h3>
                    <input type="number" id="customCookieInput" placeholder="追加するクッキー数"
                        style="padding:5px; width:200px; margin-right:10px;">
                    <button id="customCookieButton" style="padding:5px 10px; cursor:pointer;">
                        Add Cookies
                    </button>
                </div>
            `;
        });
        setInterval(function() {
            let button = document.getElementById("customCookieButton");
            if (button && !button.dataset.bound) {
                button.dataset.bound = "true";
                button.onclick = function() {
                    let input = document.getElementById("customCookieInput");
                    let value = parseFloat(input.value);
                    if (!isNaN(value) && value > 0) {
                        Game.Earn(value);
                        Game.Notify("Custom Cookie Adder", value + " クッキー追加！", [16,5]);
                    } else {
                        Game.Notify("エラー", "正しい数値を入力してください。", [0,0]);
                    }
                };
            }
        }, 500);
    },
    save: function() { return ""; },
    load: function(str) {}
});
