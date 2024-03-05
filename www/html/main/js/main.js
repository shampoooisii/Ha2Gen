import * as $ from "./tetuquery.js"

(() => {
    const main = document.querySelector("#main");
    const create_hatugen = (_hatugen_deta) => {
        const hatugen = $.createElement("div", { class:"hatugen" });
        if (!_hatugen_deta.icon) {
            const icon = $.createElement("div", { class:"icon" }, "発\n言\n者");
            hatugen.appendChild(icon);
        }
        const title = $.createElement("div", { class:"title" });
        const name = $.createElement("span", { class:"name" }, _hatugen_deta.user_name);
        title.appendChild(name);
        const id = $.createElement("span", { class:"id" }, _hatugen_deta.user_id);
        title.appendChild(id);
        hatugen.appendChild(title);
        main.appendChild(hatugen);
    }

    const get_hatugen = () => {
        const hatugen_deta_list = [
            {
                icon: null,
                user_name: "テスト",
                user_id: "@test_user",
                text: "今日は寒いね"
            }
        ]

        hatugen_deta_list.forEach((hatugen_deta) => {
            create_hatugen(hatugen_deta);
        })
    }
    get_hatugen();
})();
