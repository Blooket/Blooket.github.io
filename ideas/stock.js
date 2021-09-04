WebFont.load({
	google: {
 		families: ['Nunito:400,700']
	}
});
 var timeLeft = 100;
var s = [];
var b = 0;
var j = [{pay: 10, requiredXP: 0, title: 'Janitor', desc: 'You gotta start somewhere', icon: 'fas fa-broom'},{pay: 25, requiredXP: 10, title: 'Trucker', desc: 'A little more pay for a little harder job', icon: 'fas fa-truck-loading'},{pay: 50, requiredXP: 25, title: 'Manager', desc: 'You\'re working your way up the ladder at 50 dollars an hour', icon: 'fas fa-laptop'},{pay: 100, requiredXP: 50, title: 'Pilot', desc: 'You worked hard to get here, and it pays off', icon: 'fas fa-plane'}]
var h = [];
var o = [];
var c = [{name: 'Twotter', icon: 'fas fa-dove'}, {name: 'Goggle', icon: 'fas fa-vr-cardboard'}, {name: 'App Pool', icon: 'fas fa-apple-alt'}, {name: 'Macrosooft', icon: 'fas fa-door-open'}, {name: 'Fakebook', icon: 'fab fa-foursquare'}];
var pS = {workLvl: 0, job: 0, stock: 0, right: 0, wrong: 0, stocksBought: 0, stocksSold: 0, stockIncrease: [], time: 1, length: 1};
const app = document.querySelector('.app');
const header = document.createElement('div');app.appendChild(header);header.className = 'header';
const gameSpace = document.createElement('div');app.appendChild(gameSpace);gameSpace.className = 'gameSpace';
window.onload = function() {
	console.log('		', 'Yes, I do realize that this game is really easy to modify/alter data and stats. The purpose is to show an idea for a gamemode rather than to be secure.');
	beginScreen()
}
function beginScreen() {
	var beginContainer = document.createElement('div');gameSpace.appendChild(beginContainer);beginContainer.className = 'endContainer';
	var playBtn = document.createElement('div');beginContainer.appendChild(playBtn);playBtn.className = 'playBtn';playBtn.innerHTML = 'Play';playBtn.addEventListener('click', function() {
			pS.time = gameLengthInput.value;
			pS.length = stockLengthInput.value;
			if (document.querySelector('.checkBox').checked == true) {
				loadTutorial();
			} else {
				gameSpace.className += ' fadeScreen';
				setTimeout(function() {
					gameSpace.className = 'gameSpace';
					setUpGame();
				},500)
		}
	})
	var checkRow = document.createElement('div');beginContainer.appendChild(checkRow);checkRow.className = 'checkRow';
	var checkBox = document.createElement('input');checkRow.appendChild(checkBox);checkBox.className = 'checkBox';checkBox.type='checkbox';
	checkRow.innerHTML += 'Tutorial?'
	var gameLength = document.createElement('div');beginContainer.appendChild(gameLength);gameLength.className = 'gameLength';gameLength.innerHTML = 'Length in minutes: '
	var gameLengthInput = document.createElement('input');beginContainer.appendChild(gameLengthInput);gameLengthInput.className = 'gameLengthInput';gameLengthInput.value = '7';gameLengthInput.addEventListener('keypress', function (e) {
		var k = e.key;
		setTimeout(function() {
			gameLengthInput.value = gameLengthInput.value.replace(/\D/g,'');
			if (gameLengthInput.value > 30) {
				gameLengthInput.value = 30;
			}
		}, 10);
	})
	var stockLength = document.createElement('div');beginContainer.appendChild(stockLength);stockLength.className = 'stockLength';stockLength.innerHTML = 'Stock History Length:';
	var lengthContainer = document.createElement('div');beginContainer.appendChild(lengthContainer);lengthContainer.className = 'lengthContainer';
	var lengthLess = document.createElement('div');lengthContainer.appendChild(lengthLess);lengthLess.className = 'lengthLabel';lengthLess.innerHTML = 'Less';
	var stockLengthInput = document.createElement('input');lengthContainer.appendChild(stockLengthInput);stockLengthInput.className = 'stockLengthInput';stockLengthInput.type = 'range';stockLengthInput.min = '1';stockLengthInput.max = '10';stockLengthInput.value = '1';
	var lengthMore = document.createElement('div');lengthContainer.appendChild(lengthMore);lengthMore.className = 'lengthLabel';lengthMore.innerHTML = 'More';
}
function loadTutorial() {
	var textArr = ['Work to Earn Money', 'Invest In Stocks', 'Answer Questions to Increase Stock Value', 'Sell Stocks for Profit', 'Repeat Until You\'re Rich']
	document.querySelector(':root').style.setProperty('--bG-color', 'rgb(11, 194, 207)')
	i = 0;
	gameSpace.className += ' fadeScreen'
	setTimeout(function() {
		gameSpace.innerHTML = '';
		gameSpace.className = 'gameSpace';
		var text = document.createElement('div');gameSpace.appendChild(text);text.className = 'tutorialText';text.innerHTML = textArr[i];
	}, 500)
	var interval = setInterval(function() {
		gameSpace.className += ' fadeScreen'
		setTimeout(function() {
			gameSpace.innerHTML = '';
			gameSpace.className = 'gameSpace';
			if (i > textArr.length - 2) {
				clearInterval(interval)
				setUpGame();
			} else {
				i += 1;
				var text = document.createElement('div');gameSpace.appendChild(text);text.className = 'tutorialText';text.innerHTML = textArr[i];
			}
		}, 500)
	}, 3500)
}
function setUpGame() {
	document.querySelector(':root').style.setProperty('--bG-color', '#555')
	timeLeft = JSON.parse(pS.time) * 60;
	var random1 = Math.floor(Math.random() * 4.99);
	var random2;
	getR2();
	function getR2() {
		random2 = Math.floor(Math.random() * 4.99)
		if (random1 == random2) {
			getR2();
		}
	}
	for (i=0;i < 5;i++) {
		h.push([]);
		var newNumber;
		if(i == random1) {
			newNumber = Math.random() * (2.50 - 0.01) + 0.01;
		} else if (i == random2) {
				newNumber = Math.random() * (100 - 25) + 25;
		} else {
			newNumber = Math.random() * (55 - 5) + 5;
		}
		s.push({});
		s[i].price = JSON.parse((newNumber).toFixed(2));
		s[i].multiplier = 1;
		s[i].name = c[i].name;
		h[i].push(s[i].price * s[i].multiplier)
		o.push([])
	}
	const balance = document.createElement('div');header.appendChild(balance);balance.className = 'balance';balance.innerHTML = '$ 0';
	setInterval(function() {
		balance.innerHTML = '$ ' + getNumberFormal(JSON.parse((b).toFixed(2)))
	}, 1000)
	var timer = document.createElement('div');timer.className='timer';header.appendChild(timer);timer.innerHTML= timeLeft/60 + ':00';
	var timerInt = setInterval(
		function() {
			if(timeLeft <= 1) {
				clearInterval(timerInt)
				endGame();
			}
			timeLeft = timeLeft - 1;
			var minutesLeft = Math.floor(timeLeft / 60);
			var secondsLeft = timeLeft - minutesLeft*60;
			if(secondsLeft < 10) {secondsLeft = '0' + secondsLeft}
			timer.innerHTML = minutesLeft + ':' + secondsLeft;
		}, 1000
	)
	for (i=0;i<pS.length*50;i++){
		setTimeout(function() {passDay('none')}, i*1)
	}
	mainScreen()
}
function getNumberFormal(num) {
	var str = num.toString().split(".");
	str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return str.join(".");
}
function endGame() {
	for (i=1;i<11;i++) {
		setTimeout(function() {endGameScreen()}, i * 100)
	}
	var percentRight;
	if (pS.right + pS.wrong > 0) {
		percentRight = Math.floor(pS.right / (pS.right + pS.wrong) * 100);
	} else {
		percentRight = 0;
	}
	for (i=0;i<o.length;i++) {
		for (i2=0;i2<o[i].length;i2++) {
			b += JSON.parse((s[i].price * s[i].multiplier * o[i][i2].number).toFixed(2));
			pS.stockIncrease.push(JSON.parse(((((s[i].price * s[i].multiplier) / o[i][i2].buyPrice) - 1) * 100).toFixed(2)))
			o[i].splice(i2, 1);
		}
	}
	var stockIncreaseAverage = 0;
	for (i=0;i<pS.stockIncrease.length;i++) {
		stockIncreaseAverage += pS.stockIncrease[i];
		if (i == (pS.stockIncrease.length - 1)) {
			stockIncreaseAverage = stockIncreaseAverage / pS.stockIncrease.length;
		}
	}
	function endGameScreen() {
		document.querySelector(':root').style.setProperty('--bG-color', 'rgb(11, 194, 207)')
		gameSpace.innerHTML = '';
		header.innerHTML = '';
		var endContainer = document.createElement('div');gameSpace.appendChild(endContainer);endContainer.className = 'endContainer';
		var endRightWrong = document.createElement('div');endContainer.appendChild(endRightWrong);endRightWrong.className = 'endRightWrong';endRightWrong.innerHTML = (pS.right + '/' + (pS.right + pS.wrong)) + ' correct. Thats ' + percentRight + '%';
		if (percentRight > 50) {endRightWrong.className += ' endPositive'} else {endRightWrong.className += ' endNegative'}
		var endWork = document.createElement('div');endContainer.appendChild(endWork);endWork.className = 'endWork';endWork.innerHTML = 'You worked ' + pS.workLvl + ' times!';
		var endNetWorth = document.createElement('div');endContainer.appendChild(endNetWorth);endNetWorth.className = 'endNetWorth';endNetWorth.innerHTML = 'Net Worth: ' + getNumberFormal(JSON.parse((b).toFixed(2)));
		var endStocksExchanged = document.createElement('div');endContainer.appendChild(endStocksExchanged);endStocksExchanged.className = 'endStocksExchanged';endStocksExchanged.innerHTML = 'You bought ' + pS.stocksBought + ' stock(s), and sold ' + pS.stocksSold + ' stock(s).';
		var endStocksIncrease = document.createElement('div');endContainer.appendChild(endStocksIncrease);endStocksIncrease.className = 'endStocksIncrease';endStocksIncrease.innerHTML = 'Yours stocks on average increased by ' + JSON.parse((stockIncreaseAverage).toFixed(2)) + '%.';
		if (stockIncreaseAverage > 0) {endStocksIncrease.className += ' endPositive'} else if (stockIncreaseAverage < 0) {endStocksIncrease.className += ' endNegative'}
	}
}
	function mainScreen() {
		gameSpace.innerHTML = '';
		var beginningBtnsContainer = document.createElement('div');gameSpace.appendChild(beginningBtnsContainer);beginningBtnsContainer.className = 'beginningBtnsContainer';
		var workBtn = document.createElement('div');beginningBtnsContainer.appendChild(workBtn);workBtn.className = 'beginningBtn';workBtn.innerHTML = 'Work';workBtn.addEventListener('click', function() {
			gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
				workScreen();
			}, 500)
		})
		var workBtni = document.createElement('i');workBtn.appendChild(workBtni);workBtni.className = 'beginningBtnicon fas fa-briefcase';
		var stocksBtn = document.createElement('div');beginningBtnsContainer.appendChild(stocksBtn);stocksBtn.className = 'beginningBtn';stocksBtn.innerHTML = 'Stocks';stocksBtn.addEventListener('click', function() {
			gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
				stocksScreen();
			}, 500)
		})
		var stocksBtni = document.createElement('i');stocksBtn.appendChild(stocksBtni);stocksBtni.className = 'beginningBtnicon fas fa-chart-line';
	}
	function workScreen() {
		gameSpace.innerHTML = '';
		var leftContainer = document.createElement('div');gameSpace.appendChild(leftContainer);leftContainer.className = 'leftContainer';
		var rightContainer = document.createElement('div');gameSpace.appendChild(rightContainer);rightContainer.className = 'rightContainer';
		renderJob(pS.job);
		for (i=0;i < j.length;i++) {
			var leftBtn = document.createElement('div');leftContainer.appendChild(leftBtn);leftBtn.className = 'leftBtn';leftBtn.value = i;leftBtn.innerHTML = j[i].title;leftBtn.addEventListener('click', function() {
					for (i=0;i < j.length;i++) {
						if (document.querySelectorAll('.leftBtn')[i] == this) {
							renderJob(i);
							pS.job = i;
						}
					}
				}
			)
		}
		var backBtn = document.createElement('i');gameSpace.appendChild(backBtn);backBtn.className = 'backBtn fas fa-arrow-alt-circle-left';backBtn.addEventListener('click', function() {
			gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
					mainScreen();
			}, 500)
		})
		function renderJob(job) {
			rightContainer.innerHTML = '';
			var topRightContainer = document.createElement('div');rightContainer.appendChild(topRightContainer);topRightContainer.className = 'topRightContainer';
			var bottomRightContainer = document.createElement('div');rightContainer.appendChild(bottomRightContainer);bottomRightContainer.className = 'bottomRightContainer';
			var jobName = document.createElement('div');topRightContainer.appendChild(jobName);jobName. innerHTML = j[job].title;jobName.className = 'jobName';
			var jobIcon = document.createElement('i');jobName.appendChild(jobIcon);jobIcon.className = 'jobIcon'; jobIcon.className += ' ' + j[job].icon;
			var jobPay = document.createElement('div');topRightContainer.appendChild(jobPay);jobPay.innerHTML = '<b>Pays: </b>$' + j[job].pay;jobPay.className = 'jobTxt';
			var jobInfo = document.createElement('div');topRightContainer.appendChild(jobInfo);jobInfo.innerHTML = j[job].desc;jobInfo.className = 'jobTxt';
			var workBtn = document.createElement('div');bottomRightContainer.appendChild(workBtn);workBtn.innerHTML = 'Work';workBtn.className = 'workBtn';
			if(j[job].requiredXP > 0 && j[job].requiredXP > pS.workLvl) {
					var jobRequiredXp = document.createElement('div');topRightContainer.appendChild(jobRequiredXp);jobRequiredXp.innerHTML = 'You need <b>' + (j[job].requiredXP - pS.workLvl) + '</b> more job experience to work as this';jobRequiredXp.className = 'jobTxt';
					workBtn.className += ' xpTooLittle';
			} else {
				workBtn.addEventListener('click', function() {
					gameSpace.className += ' fadeScreen';
					setTimeout(function() {
						gameSpace.className = 'gameSpace';
						getQuestions('work', j[job]);
					}, 500)
				})
			}
		}
	}
	function stocksScreen() {
		gameSpace.innerHTML = '';
		var leftContainer = document.createElement('div');gameSpace.appendChild(leftContainer);leftContainer.className = 'leftContainer';
		var rightContainer = document.createElement('div');gameSpace.appendChild(rightContainer);rightContainer.className = 'rightContainer';
		var topRightContainer = document.createElement('div');rightContainer.appendChild(topRightContainer);topRightContainer.className = 'topRightContainer2';
		for (i=0;i < s.length;i++) {
			var stockName = document.createElement('i');topRightContainer.appendChild(stockName);stockName.className = 'stockBtn';stockName.innerHTML = s[i].name + '<br>' + getNumberFormal((JSON.parse((s[i].price * s[i].multiplier).toFixed(2))));stockName.addEventListener('click', function() {
					for (i=0;i < s.length;i++) {
						for (i2=0;i2<s.length;i2++) {
							document.querySelectorAll('.stockBtn')[i2].className = 'stockBtn';
						}
						if (document.querySelectorAll('.stockBtn')[i] == this) {
							this.className += ' selected';
							pS.stock = i;
							renderStock(i)
							i = 100;
						}
					}
				}
			)
		}

		document.querySelectorAll('.stockBtn')[pS.stock].className += ' selected';
		var midRightContainer = document.createElement('div');rightContainer.appendChild(midRightContainer);midRightContainer.className = 'midRightContainer';
		var bottomRightContainer = document.createElement('div');rightContainer.appendChild(bottomRightContainer);bottomRightContainer.className = 'bottomRightContainer';
		renderStock(pS.stock)
		var buyBtn = document.createElement('div');bottomRightContainer.appendChild(buyBtn);buyBtn.className = 'buyBtn';buyBtn.innerHTML = 'Buy Stock';buyBtn.addEventListener('click', function() {
			gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
				buyStockScreen(pS.stock)
			}, 500)
		})
		var forwardsBtn = document.createElement('div');bottomRightContainer.appendChild(forwardsBtn);forwardsBtn.className = 'forwardsBtn';forwardsBtn.innerHTML = 'Increase Value';forwardsBtn.addEventListener('click', function() {
			gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
				getQuestions('stock', pS.stock);
			}, 500)
		})
		var passBtn = document.createElement('div');bottomRightContainer.appendChild(passBtn);passBtn.className = 'passBtn';passBtn.innerHTML = 'Skip Day';passBtn.addEventListener('click', function() {
			gameSpace.className += ' fadeScreen';
			passDay('none');
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
				stocksScreen();
			}, 500)
		})
		function renderStock(stock) {
			midRightContainer.innerHTML = '';
			leftContainer.innerHTML = '';
			for (i=0;i < o[stock].length;i++) {
				var stockContainer = document.createElement('div');leftContainer.appendChild(stockContainer);stockContainer.className = 'stockContainer';
				var stockP = document.createElement('div');stockContainer.appendChild(stockP);stockP.className = 'stockProfit';stockP.innerHTML = 'Profit Per Stock:'
				var stockProfit = document.createElement('div');stockContainer.appendChild(stockProfit);stockProfit.className = 'stockProfit';stockProfit.innerHTML = getNumberFormal(JSON.parse((s[stock].price * s[stock].multiplier - o[stock][i].buyPrice).toFixed(2)));
				if (s[stock].price * s[stock].multiplier - o[stock][i].buyPrice == 0) {
					stockProfit.className += ' grayStock'
				} else if (s[stock].price * s[stock].multiplier - o[stock][i].buyPrice > 0) {
					stockProfit.className += ' greenStock'
				} else {
					stockProfit.className += ' redStock'
				}
				var stockNumber = document.createElement('div');stockContainer.appendChild(stockNumber);stockNumber.className = 'stockNumber';stockNumber.innerHTML = 'Owned: ' + o[stock][i].number;
				var sellStock = document.createElement('div');stockContainer.appendChild(sellStock);sellStock.className = 'sellStock';sellStock.innerHTML = 'Sell';sellStock.addEventListener('click', function() {
					for (i=0;i < o[stock].length;i++) {
						if (document.querySelectorAll('.sellStock')[i] == this) {
							sellStocks(stock, i)
							i = 100;
						}
					}
				})
			}
			getGraph();
			function getGraph() {
				var graph = document.createElement('canvas');midRightContainer.appendChild(graph);midRightContainer.graph = 'stockGraph';
				var height = document.querySelector('.midRightContainer').clientHeight;
				var width = document.querySelector('.midRightContainer').clientWidth;
				graph.innerWidth = width;
				graph.innerHeight = height;
				graph.width = width;
				graph.height = height;
				var ctx = graph.getContext('2d');
				var sArray;
				var sArray2;
				if ( h[pS.stock].length > (JSON.parse(pS.length) * 20)) {
					sArray = h[pS.stock].slice(h[pS.stock].length - (JSON.parse(pS.length) * 20))
				} else {
					sArray = h[pS.stock]
				}
				if ( h[pS.stock].length > (JSON.parse(pS.length)) * 60) {
					sArray2 = h[pS.stock].slice(h[pS.stock].length - (JSON.parse(pS.length) * 60))
				} else {
					sArray2 = h[pS.stock]
				}
				var length = sArray.length;
				var length2 = sArray2.length;
				var largest = 0;
				var smallest = 1/0;
				var largest2 = 0;
				var smallest2 = 1/0;
				var right = 75;
				for (i=0;i<length;i++){  
					if( sArray[i] > largest ){  
   						 largest = sArray[i];  
					}
				}
				for (i=0;i<length;i++){  
					if( sArray[i] < smallest ){  
   						 smallest = sArray[i];  
					}
				}
				for (i=0;i<length2;i++){  
					if( sArray2[i] > largest2 ){  
   						 largest2 = sArray2[i];  
					}
				}
				for (i=0;i<length2;i++){  
					if( sArray2[i] < smallest2 ){  
   						 smallest2 = sArray2[i];  
					}
				}
				ctx.beginPath();
				ctx.strokeStyle = '#aaa';
				ctx.moveTo(0,height/8);
				ctx.lineTo(width - right, height/8);
				ctx.moveTo(0, height/8*3);
				ctx.lineTo(width - right, height/8*3);
				ctx.moveTo(0, height/8*5);
				ctx.lineTo(width - right, height/8*5);
				ctx.moveTo(0, height/8*7);
				ctx.lineTo(width - right, height/8*7);
				ctx.stroke();
				ctx.font = "16px Nunito";
				ctx.strokeStyle = '#3a3a3a';
				ctx.fillText(getNumberFormal(largest2), width - right + 5, height/8);
				ctx.fillText(getNumberFormal(JSON.parse((largest2 - (largest2 - smallest2)/3).toFixed(2))), width - right + 5, height/8*3);
				ctx.fillText(getNumberFormal(JSON.parse((largest2 - (largest2 - smallest2)/3*2).toFixed(2))), width - right + 5, height/8*5);
				ctx.fillText(getNumberFormal(smallest2), width - right + 5, height/8*7);
				ctx.beginPath();
				ctx.strokeStyle = '#3f3';
				ctx.lineWidth = 2.5;
				for (i=0;i<length;i++) {
					if (length == 1) {
						ctx.moveTo(0, (height - height/4)/2 + height/8)
						ctx.lineTo((width/20*19 - right),  (height - height/4)/2 + height/8)
					} else {
						if (i == 0) {
							ctx.moveTo(0, ((1 - (sArray[i] - smallest2) / (largest2 - smallest2)) * (height - height/4)) + height/8)
						} else {
							ctx.lineTo((width/20*19 - right)/length * (i + 1), ((1 - (sArray[i] - smallest2) / (largest2 - smallest2)) * (height - height/4)) + height/8)
						}
					}
				}
				ctx.stroke()
			}
		}
		var backBtn = document.createElement('i');gameSpace.appendChild(backBtn);backBtn.className = 'backBtn fas fa-arrow-alt-circle-left';backBtn.addEventListener('click', function() {
			gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
					mainScreen();
			}, 500)
		})
	}
function getQuestions(purpose, data) {
	gameSpace.innerHTML = '';
	var qLeft;
	if (purpose == 'stock') {
		qLeft = 1;
	} else if (purpose == 'work') {
		qLeft = 1;
	}
	question();
	function question() {
		var container = document.createElement('div');container.className = 'questionsContainer';gameSpace.appendChild(container);
		var question = document.createElement('div');question.className = 'questionsQuestion';container.appendChild(question);question.innerHTML = 'What Color is The Sky?';
		var answer1 = document.createElement('div');
		var answer2 = document.createElement('div');
		if (Math.floor(Math.random() * 1.99) == 0) {
			answer1.className = 'questionsAnswer';container.appendChild(answer1);answer1.innerHTML = 'Blue';
			answer2.className = 'questionsAnswer';container.appendChild(answer2);answer2.innerHTML = 'Red';
		} else {
			answer2.className = 'questionsAnswer';container.appendChild(answer2);answer2.innerHTML = 'Red';
			answer1.className = 'questionsAnswer';container.appendChild(answer1);answer1.innerHTML = 'Blue';
		}
		answer1.addEventListener('click', function() {
			answer2.remove();
			answer1.remove();
			container.className += ' fadeGreen'
			setTimeout(function() {
				checkQ('correct');
			}, 750)
		})
		answer2.addEventListener('click', function() {
			answer2.remove();
			answer1.remove();
			container.className += ' fadeRed'
			setTimeout(function() {
				checkQ('incorrect');
			}, 750)
		})
	}
	function checkQ(qResult) {
		if (qResult == 'correct') {
			qLeft = qLeft - 1;
			pS.right += 1;
			if (qLeft == 0) {
				if (purpose == 'work') {
				pS.workLvl += 1;
				b += data.pay
				} else if (purpose == 'stock') {
					changeStock('right', data)
				}
				gameSpace.className += ' fadeScreen';
				setTimeout(function() {
					gameSpace.className = 'gameSpace';
					if (purpose == 'work') {
						workScreen();
					} else if (purpose == 'stock') {
						stocksScreen();
					}
				}, 500)
			} else {
				container.remove();
				question();
			}
		} else {
			pS.wrong += 1;
			if (purpose == 'work') {
				
				} else if (purpose == 'stock') {
					changeStock('wrong', data)
				}
			gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
				if (purpose == 'work') {
					workScreen();
				} else if (purpose == 'stock') {
					stocksScreen();
				}
			}, 500)
		}
	}
}
function buyStockScreen(stock) {
	gameSpace.innerHTML = '';
	var price = JSON.parse((s[stock].price * s[stock].multiplier).toFixed(2))
	var container = document.createElement('div');container.className = 'buyContainer';gameSpace.appendChild(container);
	var stockName = document.createElement('div');stockName.className = 'buyStockName';container.appendChild(stockName);stockName.innerHTML = s[stock].name
	var stockPrice = document.createElement('div');stockPrice.className = 'buyStockPrice';container.appendChild(stockPrice);stockPrice.innerHTML = '$' + price + ' per stock';
	var numberInput = document.createElement('input');numberInput.className = 'buyNumberInput';container.appendChild(numberInput);numberInput.placeholder = 'Up to ' + Math.floor(b/(s[stock].price*s[stock].multiplier));numberInput.addEventListener('keypress', function (e) {
			checkKey(e, 'keypress')
	})
	var numberInfo = document.createElement('div');numberInfo.className = 'buyNumberInfo';container.appendChild(numberInfo);numberInfo.innerHTML = 'Buy';numberInfo.addEventListener('click', function (e) {
			checkKey(e, 'click')
	})
	function checkKey(e, type) {
		var k = e.key;
		if (k === '.') {
			setTimeout(function() {
				if (numberInput.value > 0) {
					numberInput.value = Math.floor(numberInput.value)
				}
			}, 10)
		} else if (k === '1' || k === '2' || k === '3' || k === '4' || k === '5' || k === '6' || k === '7' || k === '8' || k === '9' || k === '0') {
			
			setTimeout(function() {
				if (numberInput.value > Math.floor(b/(s[stock].price*s[stock].multiplier))) {
					numberInput.value = Math.floor(b/(s[stock].price*s[stock].multiplier));
				}
				if (numberInput.value == Math.floor(numberInput.value)) {
						
					} else {
						if (numberInput.value > 0) {
							numberInput.value = Math.floor(numberInput.value);
						}
					}
			}, 10)
		} else if (k === 'Enter'|| type == 'click') {
	 		if (numberInput.value) {
	 			if (numberInput.value > 0) {
	 				if (numberInput.value <= Math.floor(b/(s[stock].price*s[stock].multiplier))) {
	 					if (numberInput.value == Math.floor(numberInput.value)) {
	 						buyStock();
						} else {
							invalidValue('Isn\'t whole Number', 'You can\'t buy a fraction of a stock');
						}
	 				} else {
	 					invalidValue('Number Too High', 'You can only afford to buy ' + Math.floor(b/(s[stock].price*s[stock].multiplier)) + ' of this stock.')
	 				}
	 			} else {
	 				if (numberInput.value == 0) {
	 					invalidValue('Number is 0', 'You can\'t buy 0 stocks silly')
	 				} else if (numberInput.value < 0) {
	 					invalidValue('Number too small', 'You can\'t buy negative stocks')
	 				} else {
	 				invalidValue('Value Isn\'t Valid', 'Try typing a number instead.')
	 				}
	 			}
	 		}
	 	}
	}
	function invalidValue(reason, explaination) {
		var invalidContainer = document.createElement('div');invalidContainer.className = 'invalidContainer';container.appendChild(invalidContainer);
		var invalidMenu = document.createElement('div');invalidMenu.className = 'invalidMenu';invalidContainer.appendChild(invalidMenu);
		var invalidReason = document.createElement('div');invalidReason.className = 'invalidReason';invalidMenu.appendChild(invalidReason);invalidReason.innerHTML = reason;
		var invalidExplaination = document.createElement('div');invalidExplaination.className = 'invalidExplaination';invalidMenu.appendChild(invalidExplaination);invalidExplaination.innerHTML = explaination;
		var invalidBtn = document.createElement('div');invalidBtn.className = 'invalidBtn';invalidMenu.appendChild(invalidBtn);invalidBtn.innerHTML = 'Okay';invalidBtn.addEventListener('click', function() {invalidContainer.remove()})
	}
	function buyStock() {
		pS.stocksBought += JSON.parse(numberInput.value);
		o[stock].push({buyPrice: JSON.parse((s[stock].price * s[stock].multiplier).toFixed(2)), number: numberInput.value})
		b = b - JSON.parse((s[stock].price * s[stock].multiplier * numberInput.value).toFixed(2));
		gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
					stocksScreen();
			}, 500)
	}
	var backBtn = document.createElement('i');gameSpace.appendChild(backBtn);backBtn.className = 'backBtn fas fa-arrow-alt-circle-left';backBtn.addEventListener('click', function() {
			gameSpace.className += ' fadeScreen';
			setTimeout(function() {
				gameSpace.className = 'gameSpace';
					stocksScreen();
			}, 500)
		})
}
function changeStock(qResult, num) {
	var change;
	if (qResult == 'right') {
		change = Math.random() * (1.1 - 1.01) + 1.01;
	} else if (qResult == 'wrong') {
		if (s[num].multiplier < 2 && s[num].multiplier >= 0.5) {
			change = Math.random() * (1.05 - 0.955) + 0.955;
		} else if (s[num].multiplier < 5 && s[num].multiplier >= 2) {
			change = Math.random() * (1.055 - 0.95) + 0.95;
		} else if (s[num].multiplier >= 5) {
			change = Math.random() * (1.05 - 0.8) + 0.8;
		} else if (s[num].multiplier < 0.5 && s[num].multiplier >= 0.1) {
			change = Math.random() * (1.5 - 1) + 1;
		} else if (s[num].multiplier < 0.1) {
			change = Math.random() * (2 - 1.5) + 1.5;
		}
	}
	s[num].multiplier = s[num].multiplier * change;
	h[num].push(JSON.parse((s[num].price * s[num].multiplier).toFixed(2)));
	passDay(num);
}
function passDay(num) {
	pS.day += 1;
	for (i=0;i<h.length;i++) {
		var changeS = Math.floor(Math.random() * 10000.99);
		if (changeS > 8999) {
			s[i].price = JSON.parse((s[i].price * (Math.random() * (1.0125 - 1.001) + 1.001)).toFixed(2));
			s[i].multiplier = s[i].multiplier * (Math.random() * (0.985 - 0.995) + 0.995)
		} else if (changeS < 10) {
			var random = (Math.random() * (1.5 - 1) + 1);
			s[i].price = JSON.parse((s[i].price/random).toFixed(2));
			s[i].multiplier = s[i].multiplier*random;
		} else if (changeS == 8998) {
			s[i].price = JSON.parse((s[i].price / (Math.random() * (2 - 1) + 1)).toFixed(2));
		} else if (changeS == 8997) {
			var random = (Math.random() * (3 - 1) + 1);
			s[i].multiplier = JSON.parse((s[i].multiplier/random).toFixed(2));
			s[i].price = s[i].price*random;
		}
		if (i == num) {
			
		} else {
			if (s[i].multiplier < 2 && s[i].multiplier >= 0.5) {
			change = Math.random() * (1.05 - 0.955) + 0.955;
			} else if (s[i].multiplier < 5 && s[i].multiplier >= 2) {
				change = Math.random() * (1.055 - 0.95) + 0.95;
			} else if (s[i].multiplier >= 5) {
				change = Math.random() * (1.05 - 0.9) + 0.9;
			} else if (s[i].multiplier < 0.5 && s[i].multiplier >= 0.1) {
				change = Math.random() * (1.5 - 1) + 1;
			} else if (s[i].multiplier < 0.1) {
				change = Math.random() * (2 - 1.5) + 1.5;
			}
			s[i].multiplier = s[i].multiplier * change;
			h[i].push(JSON.parse((s[i].price * s[i].multiplier).toFixed(2)));
		}
	}
}
function sellStocks(stock, num) {
	pS.stocksSold += JSON.parse(o[stock][num].number);
	pS.stockIncrease.push(JSON.parse(((((s[stock].price * s[stock].multiplier) / o[stock][num].buyPrice) - 1) * 100).toFixed(2)))
	b += JSON.parse((s[stock].price * s[stock].multiplier * o[stock][num].number).toFixed(2));
	o[stock].splice(i, 1)
	stocksScreen();
}
