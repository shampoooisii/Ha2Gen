$(() => {
    const create_ha2gen = (_ha2gen_deta) => {
        $('<div>', { class:"ha2gen" }).append(
            $('<div>', { class:"icon" }).text('発\n言\n者'),
            $('<div>', { class:"title" }).append(
                $("<span>", { class:"name" }).text( _ha2gen_deta.user_name),
                $('<span>', { class:"id" }).text( _ha2gen_deta.user_id),
                $('<span>', { class:"time" }).text('1時間')
            ),
            $('<div>', { class:"text" }).text(_ha2gen_deta.text),
            $('<div>', { class:"menu" }).append(
                $('<div>', { class:"comment"}).data('menu','reply').append(
                    $('<img>', { src:"./img/comment.svg", alt:'💬' , width:'16px'})
                ),
                $('<div>', { class:"retweet"}).data('menu','retweet').append(
                    $('<img>', { src:"./img/retweet.svg", alt:'♻️' , width:'16px'})
                ),
                $('<div>', { class:"good"}).data('menu','good').append(
                    $('<img>', { src:"./img/good.svg", alt:'👍' , width:'16px'})
                ),
                $('<div>', { class:"bad"}).data('menu','bad').append(
                    $('<img>', { src:"./img/bad.svg", alt:'👎' , width:'16px'})
                ),
            )
        ).appendTo('#main')
    }

    const get_ha2gen = () => {
        const ha2gen_deta_list = [
            {
                icon: null,
                user_name: "テスト",
                user_id: "@test_user",
                text: "今日は寒いね"
            },
            {
                icon: null,
                user_name: "テスト",
                user_id: "@test_user",
                text: "ちん子マン"
            },
            {
                icon: null,
                user_name: "テスト",
                user_id: "@test_user",
                text: "マン子チン"
            }
        ]

        ha2gen_deta_list.forEach((ha2gen_deta) => {
            create_ha2gen(ha2gen_deta);
        })
    }
    get_ha2gen()
    console.log($(".ha2gen>.menu>div"));
    $(document).on('click', '.ha2gen>.menu>div', function() {
        console.log($(this).data('menu'))
    })
});
