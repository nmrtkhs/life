var TestData = {
  UserData : {
    name: "",
    turn: 0,
    money: 0,
    area: 1,
    grid: 0,
  },
  MapMaster : [
      ["1"],
      ["2", "3"],
      ["4"]
  ],
  AreaMaster : {
    "1": {
      name: "東京",
      bgPath: "hoge/path",
      gridMaster: [
        {
          type: "plus",
          value: 0,
          description: "hoge1"
        },
        {
          type: "plus",
          value: 0,
          description: "hoge2"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge3"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge4"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge5"
        },
        {
          type: "junction",
          value: 0,
          description: "hoge6"
        },
      ]
    },
    "2": {
      name: "東京-3",
      bgPath: "hoge/path",
      gridMaster: [
        {
          type: "minus",
          value: 0,
          description: "hoge1"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge2"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge3"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge4"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge5"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge6"
        },
      ]
    },
    "3": {
      name: "東京-1",
      bgPath: "hoge/path",
      gridMaster: [
        {
          type: "minus",
          value: 0,
          description: "hoge1"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge2"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge3"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge4"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge5"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge6"
        },
      ]
    },
    "4": {
      name: "東京-4",
      bgPath: "hoge/path",
      gridMaster: [
        {
          type: "minus",
          value: 0,
          description: "hoge1"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge2"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge3"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge4"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge5"
        },
        {
          type: "minus",
          value: 0,
          description: "hoge6"
        },
      ]
    },
  },
};
