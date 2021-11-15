const FORMAT = (data) => {

    function toArray(data){
        if(data===undefined)
            data = {};       
        return [data];
    }

    function html (){

        // console.log("type of recieved data:",  Array.isArray(data));

        // if data is a single object
        if(!Array.isArray(data)){
            // convert object to an array of object 
           data = toArray(data);
        }

        return '<table>' 
                    + '<thead>'
                        + '<tr>' 
                            + Object.keys(  data[0]).map((col) => {
                                return  '<th>' + col + '</th>'
                            }).join('')
                        + '</tr>'
                    + '</thead>'
                    
                    + '<tbody>'
                    + data.map( (article) => {
                        return '<tr>' + 
                                    '<td>' + article.uuid + '</td>' +  
                                    '<td>' + article.title + '</td>' +  
                                    '<td>' + article.description + '</td>' +
                                    '<td>' + article.author + '</td>' +
                                '</tr>' ;
        
                    }).join('') 
                    + '</tbody>'

    }

    function xml(){
         // if data is a single object
        if(!Array.isArray(data)){
            // convert object to an array of object 
           data = toArray(data);
        }

        return '<root>'                    
                    + data.map( (article) => {
                        let keys = Object.keys(article);

                        return '<row>' + 
                                    keys.map(key => {
                                        return `<${key}>` + article[key] + `</${key}>` 
                                        
                                    })+
                                '</row>' ;
        
                    }).join('') 
                    + '</root>'
        

    }

    function text (){
         // if data is a single object
        if(!Array.isArray(data)){
            // convert object to an array of object 
           data = toArray(data);
        }
        
        let keys = Object.keys(data[0]);

        return [
            "Serial No.\t"+
            keys.join('\t'), // header row first
            ...data.map(
                (row, idx) =>{  return idx+1 +  keys.map(
                        fieldName => JSON
                                        .stringify(
                                            row[fieldName], (key, value) => value === null ? '' : value))
                                            .join('\t')})
          ].join('\r\n');


    }

    function csv (){

         // if data is a single object
        if(!Array.isArray(data)){
            // convert object to an array of object 
           data = toArray(data);
        }

        let keys = Object.keys(data[0]);

        return [
            keys.join(','), // header row first
            ...data.map(
                row => keys.map(
                        fieldName => JSON
                                        .stringify(
                                            row[fieldName], (key, value) => value === null ? '' : value))
                                            .join(','))
          ].join('\r\n');

       
    }

    function json (){
        
        return JSON.stringify(data);
    }
    
    return {html, xml, text, csv, json};
}

const convert = (res, data) => {
    res.format({
        json: function () {
          res.json(data);
        },
        html: function () {
          res.send(FORMAT(data).html());
        },
        csv: function () {
          res.send(FORMAT(data).csv());
        },
        xml: function () {
          res.send(FORMAT(data).xml());
        },
        text: function () {
          res.send(FORMAT(data).text());
        },
    });
}


module.exports = convert;

