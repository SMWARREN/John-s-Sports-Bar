/**
 * @file  Charts
 * @author Sean Warren <Sean.Warren@gmail.com>
 * @version 0.1
 */

 /** Class representing the Charts. */
class Charts {

  /**
    * Initates the Charts Class.
    * @returns {Object} The current data to be used on charts
    */
  constructor() {
    this.data = this.getData();
    this.formatData();
  }

  /**
    * formatData - formats the data to be used in the charts.
    */
  formatData() {
    this.allPlayers = this.data.filter(item => item.Player !== `Minnesota Twins`);
    this.allTeam = this.data.filter(item => item.Player === `Minnesota Twins`);

    this.names = this.groupByName();
    this.players = this.groupByMonth(this.allPlayers);
    this.team = this.groupByMonth(this.allTeam);

    this.avg = this.getAllAvgs(this.players);
    this.sum  = this.getAllSum(this.team);

    this.addToDom();

  }

  /**
  * chooseGraph - Picks what graph to display
  * @param  {Object} event      the click event handler
  */
  chooseGraph(event) {
    let name = $(event)[0].innerHTML;
    let data = this.filterList(this.data, name, 'e');
    this.graphData(data, name);

  }

  /**
  * graphData - Updates Graph
  * @param  {Object} data      the data used in the charts
  * @param  {String} name      the name of the player / team
  */

  graphData(data, name) {
    let array1 = [];
    let array2 = [];
    data.forEach((item) => {
      array1.push(item.BA)
      array2.push(item.Split)

    });
    interactWithGraph(null, array1, array2, name);
  }

  /**
  * filterList - filters an array
  * @param  {Object} list      the array to filter
  * @param  {String} name      the name of the player / team
  * @param  {String} comp      comparison option - e = equal or null
  * @return {Object} Returns a filtered list.
  */
  filterList(list, name, comp = 'e') {
    if (comp === 'e') {
      return (list.filter(item => item.Player === `${name}`));
    } else {
      return (list.filter(item => item.Player !== `${name}`));
    }
  }

  /**
  * addToDom - displays and maps over data
  */
  addToDom() {
    let names = [];
    Object.keys(this.names).map(function(key, index) {
      names.push(key);
    });
    names.forEach((name) => {
      $(".switch").append(`<ul onclick="init.chooseGraph(this)">${name}</ul>`);

      this.names[name].forEach(item => {
        $(".table-insert").append(`
           <tr>
             <td><span class="text-muted">${item.Player}</span></td>
             <td>${item.Split}</td>
             <td>
               ${item.G}
             </td>
             <td>
               ${item.GS}
             </td>
             <td>
               ${item.PA}
             </td>
             <td>
                 ${item.BA}
             </td>
           </tr>
           `);
      });
    })
  }

  /**
  * getAllAvgs - Get All Avgs array
  * @param  {Object} item      the array to average
  * @return {Object} Returns a list of all of the Averages
  */
  getAllAvgs(item) {
    let arrayValues = [];
    let fa = [];
    Object.keys(item).map(function(key, index) {
      arrayValues.push(key);
    });
    this.arrayValues = arrayValues;
    arrayValues.forEach(item => {
      fa.push(this.getAvg(this.players[item]));
    });
    return fa;
  }

  /**
  * getAvg - The Average Function
  * @param  {Object} item      the player / team to average
  * @return {Object} Returns the average of the player / team
  */
  getAvg(item) {
    let counter = 0;
    item.forEach(item => {
      counter += item.BA;
    });
    return counter / item.length;
  }

  /**
  * getAllSum - Get All Sums array
  * @param  {Object} item      the array to sum
  * @return {Object} Returns a list of all of the Sums
  */
  getAllSum(item) {
    let arrayValues = [];
    let fa = [];
    Object.keys(item).map(function(key, index) {
      arrayValues.push(key);
    });

    arrayValues.forEach(item1 => {
      fa.push(this.getSum(item[item1]));
    });
    return fa;
  }

  /**
  * getSum - The Sum Function
  * @param  {Object} item      the player / team to sum
  * @return {Object} Returns the sum of the player / team
  */
  getSum(item) {
    let array = [];
    item.forEach(item => {
      array.push(item.BA);
    });
    return array[0];
  }

  /**
  * groupByMonth - Group Array By month
  * @param  {Object} item      the array to be grouped
  * @return {Object} Returns grouped array by month
  */
  groupByMonth(item) {
    var month = item.reduce(function(r, a) {
      r[a.Split] = r[a.Split] || [];
      r[a.Split].push(a);
      return r;
    }, Object.create(null));

    return month;
  }
  /**
  * groupByName - Group Array By Name
  * @return {Object} Returns Grouped Array by Name
  */
  groupByName() {
    var names = this.data.reduce(function(r, a) {
      r[a.Player] = r[a.Player] || [];
      r[a.Player].push(a);
      return r;
    }, Object.create(null));

    return names;
  }

  /**
  * getData- Gets Inital Data
  * @return {Object} Returns Inital Data
  */
  getData() {
    return [{
      "Player": "Joe Mauer",
      "Split": "April/March",
      "G": 21,
      "GS": 19,
      "PA": 85,
      "AB": 80,
      "R": 9,
      "H": 18,
      "2B": 4,
      "3B": 0,
      "HR": 0,
      "RBI": 8,
      "SB": 0,
      "CS": 0,
      "BB": 5,
      "SO": 6,
      "BA": 0.225,
      "OBP": 0.271,
      "SLG": 0.275,
      "OPS": 0.546,
      "TB": 22,
      "GDP": 4,
      "HBP": 0,
      "SH": 0,
      "SF": 0,
      "IBB": 0,
      "ROE": 0,
      "BAbip": 0.243,
      "tOPS+": 37,
      "sOPS+": 53
    }, {
      "Player": "Joe Mauer",
      "Split": "May",
      "G": 22,
      "GS": 20,
      "PA": 95,
      "AB": 81,
      "R": 15,
      "H": 28,
      "2B": 6,
      "3B": 0,
      "HR": 3,
      "RBI": 11,
      "SB": 0,
      "CS": 0,
      "BB": 13,
      "SO": 16,
      "BA": 0.346,
      "OBP": 0.442,
      "SLG": 0.531,
      "OPS": 0.973,
      "TB": 43,
      "GDP": 2,
      "HBP": 1,
      "SH": 0,
      "SF": 0,
      "IBB": 1,
      "ROE": 0,
      "BAbip": 0.403,
      "tOPS+": 142,
      "sOPS+": 161
    }, {
      "Player": "Joe Mauer",
      "Split": "June",
      "G": 26,
      "GS": 24,
      "PA": 103,
      "AB": 94,
      "R": 10,
      "H": 27,
      "2B": 7,
      "3B": 0,
      "HR": 1,
      "RBI": 11,
      "SB": 1,
      "CS": 0,
      "BB": 9,
      "SO": 19,
      "BA": 0.287,
      "OBP": 0.35,
      "SLG": 0.394,
      "OPS": 0.743,
      "TB": 37,
      "GDP": 1,
      "HBP": 0,
      "SH": 0,
      "SF": 0,
      "IBB": 0,
      "ROE": 2,
      "BAbip": 0.351,
      "tOPS+": 86,
      "sOPS+": 96
    }, {
      "Player": "Joe Mauer",
      "Split": "July",
      "G": 17,
      "GS": 16,
      "PA": 79,
      "AB": 61,
      "R": 7,
      "H": 16,
      "2B": 2,
      "3B": 0,
      "HR": 1,
      "RBI": 10,
      "SB": 0,
      "CS": 0,
      "BB": 17,
      "SO": 10,
      "BA": 0.262,
      "OBP": 0.418,
      "SLG": 0.344,
      "OPS": 0.762,
      "TB": 21,
      "GDP": 1,
      "HBP": 0,
      "SH": 0,
      "SF": 1,
      "IBB": 0,
      "ROE": 1,
      "BAbip": 0.294,
      "tOPS+": 91,
      "sOPS+": 108
    }, {
      "Player": "Joe Mauer",
      "Split": "August",
      "G": 28,
      "GS": 26,
      "PA": 121,
      "AB": 107,
      "R": 15,
      "H": 36,
      "2B": 8,
      "3B": 1,
      "HR": 1,
      "RBI": 12,
      "SB": 1,
      "CS": 0,
      "BB": 11,
      "SO": 15,
      "BA": 0.336,
      "OBP": 0.405,
      "SLG": 0.458,
      "OPS": 0.863,
      "TB": 49,
      "GDP": 6,
      "HBP": 2,
      "SH": 0,
      "SF": 1,
      "IBB": 0,
      "ROE": 3,
      "BAbip": 0.38,
      "tOPS+": 115,
      "sOPS+": 130
    }, {
      "Player": "Joe Mauer",
      "Split": "Sept/Oct",
      "G": 27,
      "GS": 26,
      "PA": 114,
      "AB": 102,
      "R": 13,
      "H": 35,
      "2B": 9,
      "3B": 0,
      "HR": 1,
      "RBI": 19,
      "SB": 0,
      "CS": 1,
      "BB": 11,
      "SO": 17,
      "BA": 0.343,
      "OBP": 0.404,
      "SLG": 0.461,
      "OPS": 0.864,
      "TB": 47,
      "GDP": 3,
      "HBP": 0,
      "SH": 0,
      "SF": 1,
      "IBB": 2,
      "ROE": 2,
      "BAbip": 0.4,
      "tOPS+": 116,
      "sOPS+": 136
    }, {
      "Player": "Byron Buxton",
      "Split": "April/March",
      "G": 22,
      "GS": 20,
      "PA": 78,
      "AB": 68,
      "R": 6,
      "H": 10,
      "2B": 2,
      "3B": 0,
      "HR": 0,
      "RBI": 1,
      "SB": 3,
      "CS": 0,
      "BB": 9,
      "SO": 29,
      "BA": 0.147,
      "OBP": 0.256,
      "SLG": 0.176,
      "OPS": 0.433,
      "TB": 12,
      "GDP": 0,
      "HBP": 1,
      "SH": 0,
      "SF": 0,
      "IBB": 0,
      "ROE": 1,
      "BAbip": 0.256,
      "tOPS+": 24,
      "sOPS+": 24
    }, {
      "Player": "Byron Buxton",
      "Split": "May",
      "G": 24,
      "GS": 22,
      "PA": 80,
      "AB": 71,
      "R": 7,
      "H": 18,
      "2B": 1,
      "3B": 1,
      "HR": 2,
      "RBI": 7,
      "SB": 6,
      "CS": 1,
      "BB": 7,
      "SO": 25,
      "BA": 0.254,
      "OBP": 0.321,
      "SLG": 0.38,
      "OPS": 0.701,
      "TB": 27,
      "GDP": 0,
      "HBP": 0,
      "SH": 2,
      "SF": 0,
      "IBB": 0,
      "ROE": 0,
      "BAbip": 0.364,
      "tOPS+": 94,
      "sOPS+": 88
    }, {
      "Player": "Byron Buxton",
      "Split": "June",
      "G": 28,
      "GS": 25,
      "PA": 93,
      "AB": 87,
      "R": 9,
      "H": 16,
      "2B": 3,
      "3B": 0,
      "HR": 2,
      "RBI": 6,
      "SB": 4,
      "CS": 0,
      "BB": 6,
      "SO": 26,
      "BA": 0.184,
      "OBP": 0.237,
      "SLG": 0.287,
      "OPS": 0.524,
      "TB": 25,
      "GDP": 1,
      "HBP": 0,
      "SH": 0,
      "SF": 0,
      "IBB": 0,
      "ROE": 0,
      "BAbip": 0.237,
      "tOPS+": 45,
      "sOPS+": 37
    }, {
      "Player": "Byron Buxton",
      "Split": "July",
      "G": 10,
      "GS": 9,
      "PA": 35,
      "AB": 31,
      "R": 8,
      "H": 12,
      "2B": 1,
      "3B": 0,
      "HR": 1,
      "RBI": 2,
      "SB": 3,
      "CS": 0,
      "BB": 4,
      "SO": 8,
      "BA": 0.387,
      "OBP": 0.457,
      "SLG": 0.516,
      "OPS": 0.973,
      "TB": 16,
      "GDP": 0,
      "HBP": 0,
      "SH": 0,
      "SF": 0,
      "IBB": 0,
      "ROE": 1,
      "BAbip": 0.5,
      "tOPS+": 171,
      "sOPS+": 160
    }, {
      "Player": "Byron Buxton",
      "Split": "August",
      "G": 29,
      "GS": 29,
      "PA": 116,
      "AB": 105,
      "R": 22,
      "H": 34,
      "2B": 3,
      "3B": 2,
      "HR": 8,
      "RBI": 22,
      "SB": 8,
      "CS": 0,
      "BB": 5,
      "SO": 27,
      "BA": 0.324,
      "OBP": 0.354,
      "SLG": 0.619,
      "OPS": 0.973,
      "TB": 65,
      "GDP": 0,
      "HBP": 1,
      "SH": 3,
      "SF": 2,
      "IBB": 0,
      "ROE": 2,
      "BAbip": 0.361,
      "tOPS+": 163,
      "sOPS+": 152
    }, {
      "Player": "Byron Buxton",
      "Split": "Sept/Oct",
      "G": 27,
      "GS": 26,
      "PA": 109,
      "AB": 100,
      "R": 17,
      "H": 27,
      "2B": 4,
      "3B": 3,
      "HR": 3,
      "RBI": 13,
      "SB": 5,
      "CS": 0,
      "BB": 7,
      "SO": 35,
      "BA": 0.27,
      "OBP": 0.33,
      "SLG": 0.46,
      "OPS": 0.79,
      "TB": 46,
      "GDP": 0,
      "HBP": 2,
      "SH": 0,
      "SF": 0,
      "IBB": 2,
      "ROE": 0,
      "BAbip": 0.387,
      "tOPS+": 117,
      "sOPS+": 112
    }, {
      "Player": "Brian Dozier",
      "Split": "April/March",
      "G": 22,
      "GS": 22,
      "PA": 101,
      "AB": 91,
      "R": 12,
      "H": 22,
      "2B": 5,
      "3B": 0,
      "HR": 2,
      "RBI": 8,
      "SB": 5,
      "CS": 2,
      "BB": 10,
      "SO": 16,
      "BA": 0.242,
      "OBP": 0.317,
      "SLG": 0.363,
      "OPS": 0.679,
      "TB": 33,
      "GDP": 3,
      "HBP": 0,
      "SH": 0,
      "SF": 0,
      "IBB": 1,
      "ROE": 0,
      "BAbip": 0.274,
      "tOPS+": 61,
      "sOPS+": 89
    }, {
      "Player": "Brian Dozier",
      "Split": "May",
      "G": 23,
      "GS": 23,
      "PA": 113,
      "AB": 94,
      "R": 12,
      "H": 24,
      "2B": 5,
      "3B": 0,
      "HR": 6,
      "RBI": 14,
      "SB": 3,
      "CS": 3,
      "BB": 16,
      "SO": 25,
      "BA": 0.255,
      "OBP": 0.372,
      "SLG": 0.5,
      "OPS": 0.872,
      "TB": 47,
      "GDP": 0,
      "HBP": 2,
      "SH": 0,
      "SF": 1,
      "IBB": 3,
      "ROE": 1,
      "BAbip": 0.281,
      "tOPS+": 104,
      "sOPS+": 132
    }, {
      "Player": "Brian Dozier",
      "Split": "June",
      "G": 29,
      "GS": 28,
      "PA": 127,
      "AB": 116,
      "R": 13,
      "H": 29,
      "2B": 7,
      "3B": 0,
      "HR": 5,
      "RBI": 13,
      "SB": 2,
      "CS": 0,
      "BB": 10,
      "SO": 22,
      "BA": 0.25,
      "OBP": 0.315,
      "SLG": 0.44,
      "OPS": 0.755,
      "TB": 51,
      "GDP": 3,
      "HBP": 1,
      "SH": 0,
      "SF": 0,
      "IBB": 0,
      "ROE": 1,
      "BAbip": 0.27,
      "tOPS+": 76,
      "sOPS+": 95
    }, {
      "Player": "Brian Dozier",
      "Split": "July",
      "G": 22,
      "GS": 22,
      "PA": 106,
      "AB": 96,
      "R": 13,
      "H": 23,
      "2B": 4,
      "3B": 2,
      "HR": 4,
      "RBI": 17,
      "SB": 0,
      "CS": 0,
      "BB": 9,
      "SO": 34,
      "BA": 0.24,
      "OBP": 0.311,
      "SLG": 0.448,
      "OPS": 0.759,
      "TB": 43,
      "GDP": 1,
      "HBP": 1,
      "SH": 0,
      "SF": 0,
      "IBB": 1,
      "ROE": 1,
      "BAbip": 0.328,
      "tOPS+": 77,
      "sOPS+": 100
    }, {
      "Player": "Brian Dozier",
      "Split": "August",
      "G": 29,
      "GS": 29,
      "PA": 136,
      "AB": 116,
      "R": 27,
      "H": 37,
      "2B": 4,
      "3B": 1,
      "HR": 9,
      "RBI": 22,
      "SB": 4,
      "CS": 1,
      "BB": 18,
      "SO": 22,
      "BA": 0.319,
      "OBP": 0.419,
      "SLG": 0.603,
      "OPS": 1.023,
      "TB": 70,
      "GDP": 1,
      "HBP": 2,
      "SH": 0,
      "SF": 0,
      "IBB": 1,
      "ROE": 1,
      "BAbip": 0.329,
      "tOPS+": 138,
      "sOPS+": 168
    }, {
      "Player": "Brian Dozier",
      "Split": "Sept/Oct",
      "G": 27,
      "GS": 27,
      "PA": 122,
      "AB": 104,
      "R": 29,
      "H": 32,
      "2B": 5,
      "3B": 1,
      "HR": 8,
      "RBI": 19,
      "SB": 2,
      "CS": 1,
      "BB": 15,
      "SO": 22,
      "BA": 0.308,
      "OBP": 0.402,
      "SLG": 0.606,
      "OPS": 1.007,
      "TB": 63,
      "GDP": 3,
      "HBP": 2,
      "SH": 0,
      "SF": 1,
      "IBB": 0,
      "ROE": 0,
      "BAbip": 0.32,
      "tOPS+": 134,
      "sOPS+": 170
    }, {
      "Player": "Eddie Rosario",
      "Split": "April/March",
      "G": 22,
      "GS": 22,
      "PA": 86,
      "AB": 82,
      "R": 8,
      "H": 22,
      "2B": 2,
      "3B": 0,
      "HR": 2,
      "RBI": 8,
      "SB": 1,
      "CS": 0,
      "BB": 3,
      "SO": 16,
      "BA": 0.268,
      "OBP": 0.294,
      "SLG": 0.366,
      "OPS": 0.66,
      "TB": 30,
      "GDP": 3,
      "HBP": 0,
      "SH": 1,
      "SF": 0,
      "IBB": 0,
      "ROE": 1,
      "BAbip": 0.313,
      "tOPS+": 62,
      "sOPS+": 83
    }, {
      "Player": "Eddie Rosario",
      "Split": "May",
      "G": 25,
      "GS": 22,
      "PA": 86,
      "AB": 78,
      "R": 12,
      "H": 21,
      "2B": 5,
      "3B": 2,
      "HR": 3,
      "RBI": 7,
      "SB": 0,
      "CS": 3,
      "BB": 5,
      "SO": 16,
      "BA": 0.269,
      "OBP": 0.31,
      "SLG": 0.5,
      "OPS": 0.81,
      "TB": 39,
      "GDP": 0,
      "HBP": 0,
      "SH": 2,
      "SF": 1,
      "IBB": 0,
      "ROE": 0,
      "BAbip": 0.3,
      "tOPS+": 93,
      "sOPS+": 113
    }, {
      "Player": "Eddie Rosario",
      "Split": "June",
      "G": 25,
      "GS": 21,
      "PA": 85,
      "AB": 79,
      "R": 13,
      "H": 23,
      "2B": 3,
      "3B": 0,
      "HR": 5,
      "RBI": 9,
      "SB": 1,
      "CS": 1,
      "BB": 6,
      "SO": 19,
      "BA": 0.291,
      "OBP": 0.341,
      "SLG": 0.519,
      "OPS": 0.86,
      "TB": 41,
      "GDP": 2,
      "HBP": 0,
      "SH": 0,
      "SF": 0,
      "IBB": 0,
      "ROE": 0,
      "BAbip": 0.327,
      "tOPS+": 106,
      "sOPS+": 121
    }, {
      "Player": "Eddie Rosario",
      "Split": "July",
      "G": 23,
      "GS": 22,
      "PA": 92,
      "AB": 84,
      "R": 9,
      "H": 27,
      "2B": 11,
      "3B": 0,
      "HR": 1,
      "RBI": 10,
      "SB": 2,
      "CS": 1,
      "BB": 7,
      "SO": 17,
      "BA": 0.321,
      "OBP": 0.37,
      "SLG": 0.488,
      "OPS": 0.858,
      "TB": 41,
      "GDP": 0,
      "HBP": 0,
      "SH": 0,
      "SF": 1,
      "IBB": 0,
      "ROE": 0,
      "BAbip": 0.388,
      "tOPS+": 109,
      "sOPS+": 127
    }, {
      "Player": "Eddie Rosario",
      "Split": "August",
      "G": 29,
      "GS": 29,
      "PA": 124,
      "AB": 114,
      "R": 22,
      "H": 35,
      "2B": 7,
      "3B": 0,
      "HR": 9,
      "RBI": 25,
      "SB": 1,
      "CS": 1,
      "BB": 7,
      "SO": 20,
      "BA": 0.307,
      "OBP": 0.339,
      "SLG": 0.605,
      "OPS": 0.944,
      "TB": 69,
      "GDP": 3,
      "HBP": 0,
      "SH": 0,
      "SF": 3,
      "IBB": 1,
      "ROE": 1,
      "BAbip": 0.295,
      "tOPS+": 123,
      "sOPS+": 144
    }, {
      "Player": "Eddie Rosario",
      "Split": "Sept/Oct",
      "G": 27,
      "GS": 27,
      "PA": 116,
      "AB": 105,
      "R": 15,
      "H": 29,
      "2B": 5,
      "3B": 0,
      "HR": 7,
      "RBI": 19,
      "SB": 4,
      "CS": 2,
      "BB": 7,
      "SO": 18,
      "BA": 0.276,
      "OBP": 0.313,
      "SLG": 0.524,
      "OPS": 0.837,
      "TB": 55,
      "GDP": 2,
      "HBP": 0,
      "SH": 1,
      "SF": 3,
      "IBB": 0,
      "ROE": 1,
      "BAbip": 0.265,
      "tOPS+": 99,
      "sOPS+": 122
    }, {
      "Player": "Minnesota Twins",
      "Split": "April/March",
      "G": 227,
      "GS": 23,
      "PA": 879,
      "AB": 770,
      "R": 101,
      "H": 186,
      "2B": 39,
      "3B": 2,
      "HR": 20,
      "RBI": 98,
      "SB": 12,
      "CS": 2,
      "BB": 102,
      "SO": 179,
      "BA": 0.242,
      "OBP": 0.331,
      "SLG": 0.375,
      "OPS": 0.707,
      "TB": 289,
      "GDP": 19,
      "HBP": 3,
      "SH": 1,
      "SF": 3,
      "IBB": 2,
      "ROE": 4,
      "BAbip": 0.289,
      "tOPS+": 86,
      "sOPS+": 97
    }, {
      "Player": "Minnesota Twins",
      "Split": "May",
      "G": 269,
      "GS": 26,
      "PA": 1030,
      "AB": 908,
      "R": 125,
      "H": 236,
      "2B": 51,
      "3B": 5,
      "HR": 37,
      "RBI": 120,
      "SB": 14,
      "CS": 9,
      "BB": 103,
      "SO": 235,
      "BA": 0.26,
      "OBP": 0.337,
      "SLG": 0.449,
      "OPS": 0.786,
      "TB": 408,
      "GDP": 9,
      "HBP": 6,
      "SH": 5,
      "SF": 8,
      "IBB": 6,
      "ROE": 5,
      "BAbip": 0.309,
      "tOPS+": 104,
      "sOPS+": 110
    }, {
      "Player": "Minnesota Twins",
      "Split": "June",
      "G": 303,
      "GS": 29,
      "PA": 1079,
      "AB": 990,
      "R": 123,
      "H": 241,
      "2B": 44,
      "3B": 0,
      "HR": 37,
      "RBI": 118,
      "SB": 17,
      "CS": 4,
      "BB": 83,
      "SO": 239,
      "BA": 0.243,
      "OBP": 0.305,
      "SLG": 0.4,
      "OPS": 0.705,
      "TB": 396,
      "GDP": 21,
      "HBP": 4,
      "SH": 2,
      "SF": 0,
      "IBB": 6,
      "ROE": 10,
      "BAbip": 0.286,
      "tOPS+": 84,
      "sOPS+": 83
    }, {
      "Player": "Minnesota Twins",
      "Split": "July",
      "G": 256,
      "GS": 25,
      "PA": 991,
      "AB": 868,
      "R": 120,
      "H": 226,
      "2B": 53,
      "3B": 4,
      "HR": 18,
      "RBI": 111,
      "SB": 13,
      "CS": 3,
      "BB": 102,
      "SO": 225,
      "BA": 0.26,
      "OBP": 0.343,
      "SLG": 0.393,
      "OPS": 0.736,
      "TB": 341,
      "GDP": 12,
      "HBP": 11,
      "SH": 3,
      "SF": 7,
      "IBB": 3,
      "ROE": 13,
      "BAbip": 0.329,
      "tOPS+": 93,
      "sOPS+": 97
    }, {
      "Player": "Minnesota Twins",
      "Split": "August",
      "G": 302,
      "GS": 30,
      "PA": 1153,
      "AB": 1015,
      "R": 177,
      "H": 284,
      "2B": 49,
      "3B": 11,
      "HR": 50,
      "RBI": 170,
      "SB": 22,
      "CS": 4,
      "BB": 106,
      "SO": 228,
      "BA": 0.28,
      "OBP": 0.351,
      "SLG": 0.498,
      "OPS": 0.849,
      "TB": 505,
      "GDP": 26,
      "HBP": 12,
      "SH": 8,
      "SF": 12,
      "IBB": 4,
      "ROE": 13,
      "BAbip": 0.312,
      "tOPS+": 120,
      "sOPS+": 123
    }, {
      "Player": "Minnesota Twins",
      "Split": "Sept/Oct",
      "G": 328,
      "GS": 29,
      "PA": 1129,
      "AB": 1006,
      "R": 169,
      "H": 271,
      "2B": 50,
      "3B": 9,
      "HR": 44,
      "RBI": 164,
      "SB": 17,
      "CS": 6,
      "BB": 97,
      "SO": 236,
      "BA": 0.269,
      "OBP": 0.337,
      "SLG": 0.468,
      "OPS": 0.805,
      "TB": 471,
      "GDP": 18,
      "HBP": 10,
      "SH": 7,
      "SF": 9,
      "IBB": 5,
      "ROE": 6,
      "BAbip": 0.309,
      "tOPS+": 109,
      "sOPS+": 116
    }];
  }
}
