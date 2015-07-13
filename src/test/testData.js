var TestData = {
  UserData : {
    name: "",
    turn: 20,
    money: 0,
    area: 1,
    grid: 0,
    job: {},
  },
  "AreaDivisionMaster":{
    "1":{
      "name": "北海道",
      "prefectures": [1],
    },
    "2":{
      "name": "東北",
      "prefectures": [2, 3, 4, 5, 6, 7],
    },
    "3":{
      "name": "関東",
      "prefectures": [8, 9, 10, 11, 12, 13, 14],
    },
    "4":{
      "name": "中部",
      "prefectures": [15, 16, 17, 18, 19, 20, 21, 22, 23],
    },
    "5":{
      "name": "近畿",
      "prefectures": [24, 25, 26, 27, 28, 29, 30],
    },
    "6":{
      "name": "中国",
      "prefectures": [31, 32, 33, 34, 35],
    },
    "7":{
      "name": "四国",
      "prefectures": [36, 37, 38, 39],
    },
    "8":{
      "name": "九州・沖縄",
      "prefectures": [41, 42, 43, 44, 45, 46, 47],
    },
  },
  "ShigotoNavi": {
    "sjtb": {
      "01": "事務・企画関連",
      "02":	"金融関連",
      "03":	"ソフトウエア関連",
      "04":	"インターネット関連",
      "05":	"クリエイティブ関連",
      "06":	"通信・ﾈｯﾄﾜｰｸ関連",
      "07":	"コンサルティング関連",
      "08":	"電気・電子関連",
      "09":	"機械・メカトロ関連",
      "10":	"建築・土木・設備関連",
      "11":	"化学・素材関連",
      "12":	"薬品・バイオ関連",
      "13":	"医療・福祉・介護関連",
      "14": "営業関連",
      "15":	"サービス・販売関連",
      "16":	"作業関連",
      "99":	"その他",
    },
  },
  "PrefecturesMaster":{"1":{"name":"北海道"},"2":{"name":"青森県"},"3":{"name":"岩手県"},"4":{"name":"宮城県"},"5":{"name":"秋田県"},"6":{"name":"山形県"},"7":{"name":"福島県"},"8":{"name":"茨城県"},"9":{"name":"栃木県 "},"10":{"name":"群馬県"},"11":{"name":"埼玉県"},"12":{"name":"千葉県"},"13":{"name":"東京都"},"14":{"name":"神奈川県"},"15":{"name":"新潟県"},"16":{"name":"富山県"},"17":{"name":"石川県"},"18":{"name":"福井県"},"19":{"name":"山梨県"},"20":{"name":"長野県"},"21":{"name":"岐阜県"},"22":{"name":"静岡県"},"23":{"name":"愛知県"},"24":{"name":"三重県"},"25":{"name":"滋賀県"},"26":{"name":"京都府"},"27":{"name":"大阪府"},"28":{"name":"兵庫県"},"29":{"name":"奈良県"},"30":{"name":"和歌山県"},"31":{"name":"鳥取県"},"32":{"name":"島根県"},"33":{"name":"岡山県"},"34":{"name":"広島県"},"35":{"name":"山口県"},"36":{"name":"徳島県"},"37":{"name":"香川県"},"38":{"name":"愛媛県"},"39":{"name":"高知県"},"40":{"name":"福岡県"},"41":{"name":"佐賀県"},"42":{"name":"長崎県"},"43":{"name":"熊本県"},"44":{"name":"大分県"},"45":{"name":"宮崎県"},"46":{"name":"鹿児島県"},"47":{"name":"沖縄県"}},"SpaceMaster":{"47_20":[{"type":"start","value":10,"description":"スタート"},{"type":"money","value":10,"description":"新人研修\n地域の商工会議所に\u000b週一で通う日々。\u000b年配のオジサマ方に\u000bかわいがられる"},{"type":"hobby","value":10,"description":"遊ぶ\n週末は地元の\u000bイオンモールへ。\u000b「ららぽ」が憧れ"},{"type":"family","value":10,"description":"出会い\n地元の世話役から\u000bお見合いの話が。\u000bとんとん拍子に話が\u000b進んで、結婚♡"},{"type":"live","value":10,"description":"引っ越し\n新居はお見合いを\u000bアレンジしてくれた\u000b世話役の方の紹介で\u000b小さい一軒家に"},{"type":"family","value":20,"description":"出産\n第一子誕生。\u000b自然豊かで空気が\u000bきれいな地方にいる\u000b良さを改めて感じる"}],"47_30":[{"type":"wealth","value":10,"description":"車購入\n地方での生活、特に\u000b家族で移動するには\u000b車は必須。もちろん\u000bミニバンを購入"},{"type":"family","value":10,"description":"第二子出産\n第一子の誕生から\u000b３年経ってからの\u000b二人め誕生。家計は\u000b厳しくなるけど…"},{"type":"live","value":10,"description":"保育園\n上の子どもが\u000b保育園デビュー。\u000b園もすぐに見つかり\u000bスムーズに通園開始"},{"type":"hobby","value":10,"description":"遊ぶ\n週末は地元の\u000b友達と河川敷で\u000bBBQ。家族ぐるみの\u000bつきあいが楽しい"},{"type":"family","value":10,"description":"第三子誕生\n仕事でも責任ある\u000b立場になって年収もあがったところだし\u000bちょうどいいかも"},{"type":"live","value":4,"description":"引っ越し\nさすがに家族５人で\u000b暮らすには今までの\u000b家は手狭。地元で\u000b庭付き一軒家を購入"}],"47_40":[{"type":"hobby","value":5,"description":"遊ぶ\n子どもが野球に\u000bハマり、週末は\u000b家族で地元の\u000bチームの応援に"},{"type":"hobby","value":1,"description":"運動会\n子どもの学校の\u000b運動会で大活躍♪\u000b周りの親と比べて\u000b若いぶん重宝される"},{"type":"money","value":-10,"description":"高校受験\nついに上の子どもは\u000b高校受験。まだ少し\u000b早いけど、これから\u000b学費も考えないと…"},{"type":"hobby","value":10,"description":"遊ぶ\n週末は家族みんなで\u000b草野球の試合。\u000b息子と一緒になって\u000bスポーツできる喜び"},{"type":"family","value":-10,"description":"子どもが都会へ!?\n第二子が都会にある\u000b有名高校を受験し、\u000bなんと合格。ひとり\u000b暮らしをさせる…？"},{"type":"money","value":-20,"description":"家計逼迫\n子どもたちの学費の\u000b負担が最大に。上の\u000b子が地元の公立大に\u000b進んでくれたのが\u000bせめてもの救い"}],"47_50":[{"type":"hobby","value":10,"description":"遊ぶ\n末っ子をのぞいて\u000b子どもたちも家を\u000b離れて落ち着いた。\u000b週末は夫婦でゆっくり\u000b過ごすことも"},{"type":"live","value":10,"description":"車購入\n家のローン返済も\u000bだいぶ視野に入って\u000bきたのでちょっと\u000b高級車に買換え♪"},{"type":"hobby","value":10,"description":"海外旅行\n下の子どもも大学に\u000b入って家を出たので\u000b久しぶりに夫婦二人\u000b水入らずの海外旅行"},{"type":"family","value":10,"description":"子どもの結婚\n上の子がある日\u000b「話がある」という。\u000bまさか…と思ったら\u000bやはり！めでたい！"},{"type":"family","value":10,"description":"息子と晩酌\n久々に帰省してきた\u000b次男と一緒に晩酌。\u000b我が子と酌み交わす酒は格別の味"},{"type":"health","value":-10,"description":"病気・入院\n思わぬ大病を患い\u000b長期入院。地元の\u000b友達や同僚、取引先が\u000bお見舞いにきてくれた"}],"47_60":[{"type":"family","value":10,"description":"還暦\n60歳の誕生日は\u000b家族総出でお祝い。\u000b気恥ずかしいけど、\u000b皆で祝ってもらえると\u000bやっぱり感無量。"},{"type":"family","value":10,"description":"孫誕生！\n上の子と次男に\u000b相次いで子どもが！\u000bまさか自分が孫を\u000b抱く日がくるとは…"},{"type":"hobby","value":10,"description":"仕事\nいよいよ仕事人生も\u000b終わりがみえてきて\u000bそろそろ定年した後どう過ごすか考える"},{"type":"work","value":10,"description":"定年退職\nついに仕事を引退。\u000b仕事場のみんなに\u000b花束をもらって、\u000b無事、定年。"},{"type":"hobby","value":10,"description":"海外旅行\n定年祝いに夫婦で\u000b久々に海外旅行。\u000b夫婦水入らずの\u000bハネムーン気分♪"},{"type":"money","value":-10,"description":"家が手に入ったローン完済\nいろいろ苦労もしたけど、前倒しで家の\u000bローン完済。これで\u000b老後も見通しがたつ"}],"47_70":[{"type":"live","value":10,"description":"車購入\nローンも完済したし、生活用の車はあるけど奮発して、大好きな\u000bスポーツカーを購入！"},{"type":"hobby","value":10,"description":"趣味三昧\nふだんは地元の\u000bクラブでテニスや\u000bカラオケ、週末は\u000b仲間とハイキングに"},{"type":"money","value":10,"description":"顧問就任\n長年の経験を後進に\u000b伝えてほしいという\u000b依頼を受けて元の\u000b勤め先の顧問に就任"},{"type":"health","value":-10,"description":"長期入院\n持病がここで再発。\u000b前の入院のとき同様\u000b地元の皆のお見舞いが嬉しい"},{"type":"hobby","value":10,"description":"本の執筆\n無事退院したが改めて人生は有限と感じた。何か形に残るものをと本の執筆を決意"}],"47_80":[{"type":"money","value":-10,"description":"墓地購入\nいよいよこれが\u000b人生最後の大きな\u000b買い物か…自分が\u000bはいるお墓を購入"},{"type":"hobby","value":10,"description":"趣味三昧\n相変わらず普段は\u000b地元の友達テニスや\u000bカラオケ、週末は\u000b山登りも"},{"type":"hobby","value":10,"description":"国内旅行\nそろそろこれが\u000b最後の旅行かね、\u000bなんて軽口をたたき\u000bながら夫婦で旅行"},{"type":"hobby","value":10,"description":"趣味三昧\n相変わらず普段は\u000b地元の友達テニスや\u000bカラオケ、週末は\u000b山登りも"},{"type":"hobby","value":10,"description":"ボランティア\n地元の子どもたちに\u000b仕事や家族、人生の\u000bことを話すという\u000bボランティアに参加"},{"type":"live","value":10,"description":"振り返り\n本当に久々に子どもも孫も揃って家族全員で迎えるお正月。実に\u000b幸せな人生だった…"},{"type":"goal","value":0,"description":"GOAL\nおつかれさま\u000bでした。"}]},"MapMaster":{"47":[{"areaIds":["47_20"]},{"areaIds":["47_30","47_40"]},{"areaIds":["47_50"]},{"areaIds":["47_60"]},{"areaIds":["47_70"]},{"areaIds":["47_80"]}],"13":[{"areaIds":["13_1"]},{"areaIds":["13_2","13_3"]},{"areaIds":["13_4"]}]},"AreaMaster":{"47_20":{"bgPath":"test","junctionType":"toTwo"},"47_30":{"bgPath":"test","junctionType":"toOne"},"47_40":{"bgPath":"test","junctionType":"toOne"},"47_50":{"bgPath":"test","junctionType":"normal"},"47_60":{"bgPath":"test","junctionType":"normal"},"47_70":{"bgPath":"test","junctionType":"normal"},"47_80":{"bgPath":"test","junctionType":"end"}},
};
