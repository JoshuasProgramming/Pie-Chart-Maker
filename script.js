

const draw = document.getElementById('draw').addEventListener("click", (e)=>{
    let data_labels = document.getElementById('data_labels');
    let dataLabels = data_labels.value.split(" ");

    let data_values = document.getElementById('data_values');
    let dataValues = data_values.value.split(" ");

    let title = document.getElementById('title');

    /** 
     * Google Chart
     */
    
    //xValues
    let xValues = [];
    for(let i = 0; i < dataValues.length; i++){
        xValues.push(dataLabels[i]);
    }

    //yValues
    let yValues = [];
    for(let i = 0; i < dataValues.length; i++){
        yValues.push(dataValues[i]);
    }

    //barColors
    let barColors = [];
    for(let i = 0; i<dataValues.length;i++){
        barColors.push("#" + Math.floor(Math.random()*16777215).toString(16));
    }

    //upload chart on page
    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display:true,
                text: title.value
            }
        }
    });

    let downloadbtn = document.createElement('div');
    downloadbtn.innerHTML = "<button id='download_btn' class='download-btn'>Download</button>";
    document.body.append(downloadbtn);
 
    const download_btn = document.getElementById('download_btn').addEventListener("click", (e)=>{
        const container = document.getElementById('container'); //myChart
 
        let options = {
            margin: [0,-1,-13,-3], //top, left, buttom, right, 
            filename: title.value + '.pdf', //creates the file name
            image: {type: 'png', quality:0.98}, //set the type of file and quality
            html2canvas: {scale:1},
            jsPDF: {unit: 'in', format: 'letter', orientation: 'landscape'}
        }
     
        html2pdf().set(options).from(container).save(); //uploads the 'container_info' to the user's computer.
 
        document.body.removeChild(downloadbtn); //removes the download button so we don't get duplications if the users calculates again.
    });
});