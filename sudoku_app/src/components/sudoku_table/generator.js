var matrix = () => {
	let matArr = []
	let res = [1,2,3,4,5,6,7,8,9]
	var s = () => {
		var mineRes = []
		let j = 0
		while(j++ < 3){
			mineRes.push(JSON.parse(JSON.stringify(res)))
			res.push(...res.splice(0,3))
		}
		res.push(res.shift())

		return mineRes
		}
	let i = 0
	while(i++ <3)matArr.push(...s())
	return matArr
}
let ranEl = start =>start+Math.round(Math.random()*2)

let ranBlock = () =>[0,3,6][Math.round(Math.random()*2)]

let lineShuffle = res => {
let i = 0
while(i<=6){
	let recChangeLine = () => {
		let one = ranEl(i)
		let sec = ranEl(i)
		if(one === sec) recChangeLine()
			else {
				res.splice(sec,1, ...res.splice(one,1, ...res.splice(sec,1,0)))
		    }
	}
	recChangeLine()
	i+=3
}

return res
}
let columnShuffle = res =>{
let i = 0
while(i<=6){
	let recChangeColumn = () => {
		let one = ranEl(i)
		let sec = ranEl(i)
		if(one === sec) recChangeColumn()
			else {
				res.forEach(line=>{
					let firstEl = line[one]
					let secEl = line[sec]
					line[one] = secEl
					line[sec] = firstEl
				})
			}
	}
	recChangeColumn()
	i+=3
}
return res
}

let horizontalblockShuffle = res => {
	let recChangeHorizontalblock = () => {
		let one = ranBlock()
		let sec = ranBlock()
		if(one === sec) recChangeHorizontalblock()
			else {
				res.splice(sec,3, ...res.splice(one,3, ...res.splice(sec,3,0,0,0)))
		    }
	}
	recChangeHorizontalblock()

return res
}

let verticalblockShuffle = res =>{
	let recChangeVerticalblock = () => {
		let one = ranBlock()
		let sec = ranBlock()
		if(one === sec) recChangeVerticalblock()
			else {
				res.forEach(line=>{
					line.splice(sec,3, ...line.splice(one,3, ...line.splice(sec,3,0,0,0)))
				})
			}
	}
	recChangeVerticalblock()

return res
}


let disabledNum = (res, from, until) => {
let i = 0
while(i<=6){
	let delEl = 0
	function rec (num){
		if (num >6)return
		res.forEach((line, index)=>{
			if(index >=i && index <= i+2)
			line.forEach((el, ind)=>{
				if(ind>= num && ind <= num+2){
					if(Math.round(Math.random()*10)<5 && delEl<until && el) {
						delEl++
						line[ind] = 0
					}
				}
			})

		})
		if (from <= delEl){
			let n = num+3
			delEl=0
			rec(n)
		}
		else rec(num)
	}
	 rec(0)
	i+=3
}
return res
}

let disabledNumLine	= (res, from, until) => {
if (!from && !until)return console.error("until,from не заданы")
let numDels = 0
let rec = indLine => {
	if (indLine>8)return
	res[indLine].forEach((el, ind, arr)=>{
		if (Math.random()<0.5 && numDels < until && el) {
			arr[ind] = 0
			numDels++

		}
	})
	if( numDels >= from) {
		numDels = 0
		rec( ++indLine )
	}else rec(indLine)
}
rec(0)
return res
}
let generateSudoku = () => {
	return (
		lineShuffle(
			columnShuffle(
				horizontalblockShuffle(
					verticalblockShuffle(
						matrix()
					)
				)
			)
		)
	)
}


export {generateSudoku,disabledNumLine}
