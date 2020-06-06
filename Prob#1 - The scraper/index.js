const puppeteer = require('puppeteer')
const fs = require('fs')

const scrapeData = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	const url = 'https://rubnongkaomai.com'

	await page.goto(`${url}/baan`)
	await page.waitForSelector('.ant-select', { visible: true })
	await page.click('.ant-select')
	await page.evaluate(() => {
		const houseTypes = document.querySelectorAll(
			'.ant-select-dropdown-menu-item'
		)
		houseTypes.forEach((item) => item.click())
	})

	const links = await page.evaluate(() => {
		const houses = document.querySelectorAll('.ant-col a')
		return Array.from(houses).map((node) => node.getAttribute('href'))
	})

	const data = []
	for (const link of links) {
		await page.goto(`${url}${link}`)
		await page.waitForSelector('h1', { visible: true })
		const name = await page.$eval('h1', (node) => node.textContent)
		const slogan = await page.$eval('h3', (node) => node.innerHTML)
		data.push({ name, slogan })
	}
	await browser.close()

	createHtml(data)
	const html = createHtml(data)
	fs.writeFile('table.html', html, 'utf8', (err) => {
		if (err) console.log('error', err)
	})
}

const createHtml = (data) => `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <title>รับน้องก้าวไหม</title>
    </head>
    <body>
		<div class="container">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="thead-light">
						<tr>
							<th scope='col'>ชื่อบ้าน</th>
							<th scope='col'>สโลแกน</th>
						</tr>
					</thead>
					<tbody>${tbody(data)}</tbody>
				</table>
			</div>
		</div>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    </body>
</html>
`

const tbody = (data) => `
${Array.from(data)
	.map(({ name, slogan }) => `<tr><td>${name}</td><td>${slogan}</td></tr>`)
	.join('')}
`

scrapeData()
