$(document).ready(function() {

  // create c3 charts
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                ['Joe Mauer', ...xval],
            ],
            type: 'line',
            colors: {
                'Joe Mauer': 'red',
            },
        },
        axis: {
            x: {
                type: 'category',
                categories: [...yval]
            },
        },
        legend: {
            show: true,
        },
        padding: {
            bottom: 0,
            top: 0
        },
    });

    /**
    * addTeamAvg - Add Team Average to Charts
    */
    function addTeamAvg() {
        chart.load({
            unload: true,
            columns: [
                ['Minnesota Twins Averages', ...init.sum],
                ['Provided Players Averages', ...init.avg],
            ],
        });
    }

    /**
    * changeOverlap - Can You Overlap On Chart
    */
    function changeOverlap() {
        window.overlap = !window.overlap;
    }

    /**
    * Clear - Clear Chart
    */
    function clear() {
        chart.unload();
    }

    /**
    * interactWithGraph - The function to interactWithGraph
    * @param  {Object} event     the click event handler
    * @param  {Object} array1     the graphs x values
    * @param  {Object} array2     the graphs y values
    * @param  {String} name     whose data is being used.
    * @return {Object} Returns new graph
    */
    function interactWithGraph(e, array1 = null, array2 = null, name = null) {

        if (window.overlap) {
            $(".table-insert").empty();
        }
        init.names[name].forEach(item => {
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
        if (array1 === null) {
            chart.load({
                columns: [
                    ['Joe Mauer', ...xval],
                ],
            });
        } else {
            chart.load({
                unload: !window.overlap ? [] : false,
                columns: [
                    [name, ...array1],
                ],
            })
        }
    }

    // Add click event handlers and make functions global.
    $(".interactWithGraph").on("click", interactWithGraph);
    $(".overlap").on("click", changeOverlap);
    $(".clear").on("click", clear);
    $(".team").on("click", addTeamAvg);
    window.interactWithGraph = interactWithGraph;
    window.overlap = true;
});
