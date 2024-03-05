$(() => {
    // 発言を要素として召喚
    const create_ha2gen = (_ha2gen_deta) => {
        $('<div>', { class:"ha2gen" }).append(
            $('<div>', { class:"icon" }).append(
                $('<div>', { class:"icon-img" }).text(_ha2gen_deta.icon ?? "発言者").append(
                    $('<img>', { src:_ha2gen_deta.icon })
                )
            ),
            $('<div>', { class:"title" }).append(
                $("<span>", { class:"name" }).text( _ha2gen_deta.user_name),
                $('<span>', { class:"id" }).text( _ha2gen_deta.user_id),
                $('<span>', { class:"time" }).text('1時間')
            ),
            $('<div>', { class:"text" }).text(_ha2gen_deta.text),
            $('<div>', { class:"menu" }).append(
                $('<li>', { class:"comment"}).data('menu','reply').text(_ha2gen_deta.comment),
                $('<li>', { class:"reTweet"}).data('menu','retweet').text(_ha2gen_deta.reTweet),
                $('<li>', { class:"good"}).data('menu','good').text(_ha2gen_deta.good),
                $('<li>', { class:"bad"}).data('menu','bad').text(_ha2gen_deta.bad),
            )
        ).appendTo('#main')
    }

    // 発言をha2gen_list.jsonから取得する
    fetch('./ha2gen_list.json')
    .then(response => response.json())
    .then(data => {
        data.forEach((ha2gen_deta) => {
            create_ha2gen(ha2gen_deta);
        })
    })
    .catch(error => {
        console.error('エラー:', error);
    });

    // クリックしたらログ出力
    $(document).on('click', '.ha2gen>.menu>li', function() {
        console.log($(this).data('menu'))
    })
});
