
const FORMAT = () => {

    function html (data){
        
        console.log("length of recieved data:", typeof data);

        // if data is a single object
        if(typeof data == "object"){
            // convert object to an array of object 
            let dataArr = [];
            dataArr.push(data);
            data = dataArr;
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
                                    '<td>' + article.title + '</td>' +  
                                    '<td>' + article.description + '</td>' +
                                    '<td>' + article.author + '</td>' +
                                '<tr/>' ;
        
                    }).join('') 
                    + '</tbody>'

        
    }

    function xml(){

    }

    function text (){

    }

    function csv (){

    }
    
    return {html, xml, text, csv};
}

module.exports = FORMAT;
