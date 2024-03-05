$(() => {
    const main = document.querySelector("#main");
    const create_ha2gen = (_ha2gen_deta) => {
        const ha2gen = $.createElement("div", { class:"ha2gen" });
        if (!_ha2gen_deta.icon) {
            const icon = $.createElement("div", { class:"icon" }, "発\n言\n者");
            ha2gen.appendChild(icon);
        }
        const title = $.createElement("div", { class:"title" });
        const name = $.createElement("span", { class:"name" }, _ha2gen_deta.user_name);
        title.appendChild(name);
        const id = $.createElement("span", { class:"id" }, _ha2gen_deta.user_id);
        title.appendChild(id);
        ha2gen.appendChild(title);
        main.appendChild(ha2gen);
    }

    const get_ha2gen = () => {
        const ha2gen_deta_list = [
            {
                icon: null,
                user_name: "テスト",
                user_id: "@test_user",
                text: "今日は寒いね"
            }
        ]

        ha2gen_deta_list.forEach((ha2gen_deta) => {
            create_ha2gen(ha2gen_deta);
        })
    }
    console.log($(".ha2gen>.menu>div"));
    $(".ha2gen>.menu>div").on('click', () => {
        console.log($(this).data('menu'))
        console.log(this)
    })
});
