const http = require('http');
const PORT = 3000;

const server = http.createServer(async (req, res) => {
	
	req.on('data', (chunk) => {
  console.log('You received a chunk of data', chunk)
})
	const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();
	
	var promt = 'scrie un scurt poem de ' + JSON.parse(data).strophes + ' strofe, fiecare cu cate ' + JSON.parse(data).verses + ' versuri pe tema ' + JSON.parse(data).theme + ', continand cuvintele ' + JSON.parse(data).keywords;
	
	
	
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-API-KEY': '18fd7235-bbee-43dc-858e-30abd3b3bfa7'
  },
  body: JSON.stringify({
    enable_google_results: 'true',
    enable_memory: false,
    input_text: promt
  })
};

	var poem;
	
async function get_poem() {
	try {
	const response = await fetch('https://api.writesonic.com/v2/business/content/chatsonic?engine=premium&language=ro', options);
	
	var poem_json = await response.json();
	
	poem = poem_json.message;
	
	} catch (error) {
		poem = 'Sorry, we could not generate a poem for you at this time, please try again later';
	}
}

await get_poem();
	
	
	
	
	var obj = new Object();
	obj.poem = poem;
	obj.link = "temp";
	
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(obj));
	
	
	
	
	
	/*var obj = new Object();
	obj.poem = promt;
	obj.link = "temp";
	
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(obj));*/
});


server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})






