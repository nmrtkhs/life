var TestData = {
  UserData : {
    name: "",
    turn: 20,
    money: 0,
    area: 1,
    grid: 0,
    job: {},
  },
  "PrefecturesMaster":{"1":{"name":"北海道"},"2":{"name":"青森県"},"3":{"name":"岩手県"},"4":{"name":"宮城県"},"5":{"name":"秋田県"},"6":{"name":"山形県"},"7":{"name":"福島県"},"8":{"name":"茨城県"},"9":{"name":"栃木県 "},"10":{"name":"群馬県"},"11":{"name":"埼玉県"},"12":{"name":"千葉県"},"13":{"name":"東京都"},"14":{"name":"神奈川県"},"15":{"name":"新潟県"},"16":{"name":"富山県"},"17":{"name":"石川県"},"18":{"name":"福井県"},"19":{"name":"山梨県"},"20":{"name":"長野県"},"21":{"name":"岐阜県"},"22":{"name":"静岡県"},"23":{"name":"愛知県"},"24":{"name":"三重県"},"25":{"name":"滋賀県"},"26":{"name":"京都府"},"27":{"name":"大阪府"},"28":{"name":"兵庫県"},"29":{"name":"奈良県"},"30":{"name":"和歌山県"},"31":{"name":"鳥取県"},"32":{"name":"島根県"},"33":{"name":"岡山県"},"34":{"name":"広島県"},"35":{"name":"山口県"},"36":{"name":"徳島県"},"37":{"name":"香川県"},"38":{"name":"愛媛県"},"39":{"name":"高知県"},"40":{"name":"福岡県"},"41":{"name":"佐賀県"},"42":{"name":"長崎県"},"43":{"name":"熊本県"},"44":{"name":"大分県"},"45":{"name":"宮崎県"},"46":{"name":"鹿児島県"},"47":{"name":"沖縄県"}},"SpaceMaster":{"47_1":[{"type":"money","value":1,"description":"家が手に入った"},{"type":"family","value":-1,"description":"家族が手に入った"},{"type":"health","value":4,"description":"お茶を飲んだ"},{"type":"car","value":5,"description":"車をもらった"},{"type":"money","value":1,"description":"家が手に入った"},{"type":"family","value":-1,"description":"家族が手に入った"},{"type":"health","value":4,"description":"お茶を飲んだ"},{"type":"car","value":5,"description":"車をもらった"}],"47_2":[{"type":"money","value":1,"description":"家が手に入った"},{"type":"family","value":-1,"description":"家族が手に入った"},{"type":"health","value":4,"description":"お茶を飲んだ"},{"type":"car","value":5,"description":"車をもらった"},{"type":"money","value":1,"description":"家が手に入った"},{"type":"family","value":-1,"description":"家族が手に入った"},{"type":"health","value":4,"description":"お茶を飲んだ"},{"type":"car","value":5,"description":"車をもらった"}],"47_3":[{"type":"money","value":1,"description":"家が手に入った"},{"type":"family","value":-1,"description":"家族が手に入った"},{"type":"health","value":4,"description":"お茶を飲んだ"},{"type":"car","value":5,"description":"車をもらった"},{"type":"money","value":1,"description":"家が手に入った"},{"type":"health","value":-1,"description":"家族が手に入った"},{"type":"health","value":4,"description":"お茶を飲んだ"},{"type":"car","value":5,"description":"車をもらった"}],"47_4":[{"type":"money","value":1,"description":"家が手に入った"},{"type":"health","value":-1,"description":"家族が手に入った"},{"type":"heath","value":4,"description":"お茶を飲んだ"},{"type":"car","value":5,"description":"車をもらった"},{"type":"money","value":1,"description":"家が手に入った"},{"type":"family","value":-1,"description":"家族が手に入った"},{"type":"healty","value":4,"description":"お茶を飲んだ"},{"type":"goal","value":5,"description":"ゴールしました"}]},"MapMaster":{"47":[{"areaIds":["47_1"]},{"areaIds":["47_2","47_3"]},{"areaIds":["47_4"]}],"13":[{"areaIds":["13_1"]},{"areaIds":["13_2","13_3"]},{"areaIds":["13_4"]}]},"AreaMaster":{"47_1":{"bgPath":"test","junctionType":"toTwo"},"47_2":{"bgPath":"test","junctionType":"toOne"},"47_3":{"bgPath":"test","junctionType":"straignt"},"47_4":{"bgPath":"test","junctionType":"straight"}},
  // MapMaster : [
  //     ["1"],
  //     ["2", "3"],
  //     ["4"]
  // ],
  // AreaMaster : {
  //   "1": {
  //     name: "東京",
  //     bgPath: "hoge/path",
  //     endType: "toTwo",
  //     gridMaster: [
  //       {
  //         type: "start",
  //         value: 0,
  //         description: "hoge1"
  //       },
  //       {
  //         type: "plus",
  //         value: 0,
  //         description: "hoge2"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge3"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge4"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge5"
  //       },
  //       {
  //         type: "junction",
  //         value: 0,
  //         description: "hoge6"
  //       },
  //     ]
  //   },
  //   "2": {
  //     name: "東京-3",
  //     bgPath: "hoge/path",
  //     endType: "toOne",
  //     gridMaster: [
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge1"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge2"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge3"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge4"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge5"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge6"
  //       },
  //     ]
  //   },
  //   "3": {
  //     name: "東京-1",
  //     bgPath: "hoge/path",
  //     endType: "toOne",
  //     gridMaster: [
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge1"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge2"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge3"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge4"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge5"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge6"
  //       },
  //     ]
  //   },
  //   "4": {
  //     name: "東京-4",
  //     bgPath: "hoge/path",
  //     endType: "end",
  //     gridMaster: [
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge1"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge2"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge3"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge4"
  //       },
  //       {
  //         type: "minus",
  //         value: 0,
  //         description: "hoge5"
  //       },
  //       {
  //         type: "goal",
  //         value: 0,
  //         description: "hoge6"
  //       },
  //     ]
  //   },
  // },
};
