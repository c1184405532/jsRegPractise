
//import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
let value;
function RegReplace() {
	const [inputValue, setinputValue] = useState(null)
	const [userName, setUserName] = useState('')
	function inputChange(e) {
		value = e.target.value;
		console.log(e.target.value)
	}

	function Template() {
		let str = `何为凡人，何为仙，岂闻韶华尽何年，回首沧桑，此恨绵绵，风月如剑，看我破天。道不尽仙凡殊途，尽人间。英文abcdefg，数字123456`;
		let reg = new RegExp(inputValue, 'g')
		str = str.replace(reg, serach => {
			return `<span style="color:red;">${serach}</span>`;
		})
		//console.log(str)
		return (<span dangerouslySetInnerHTML={{ __html: str }} />);
	}
	function setValue() {
		setinputValue(value)
	}
	function tel(number) {
		//以010或者020开始 后面跟上一个- \-转义成实际字符 \d 匹配数字 {7,8} 7-八位
		return /^(010|020)-\d{7,8}/.test(number)
	}
	function url(path) {
		//以http开头 s?有0个或者一个s \/\/两个转义双斜杆 \w匹配单词 +\.跟上一个字符串. 然后继续跟上\w单词 继续跟上上一个字符串. \.
		//最后\w匹配单词结尾
		return /^https?:\/\/\w+\.\w+\.\w+/.test(path)
	}
	function inputUserChange(e) {
		///^(\w|\d|[\u4e00-\u9fa5]){3,6}$/)
		// 以字母 或者 数字 或中文字符开始 字符长度为3-6位
		setUserName(e.target.value)
	};
	function manyString() {
		let str = `
            #1 js,200元#
            # 2 node.js,500元#

            # 3 php,800元#
            # 4 www.baidu.com# 123
        `
		let result = str.match(/^\s*#\s*\d+\s*.+\s*#$/gm).map(v => {
			v = v.replace(/\s*#\s*\d+\s*/, '').replace(/#/, '')
			let [name, price] = v.split(',');
			return {
				name,
				price
			}
		})
		return result
	}
	function regDate() {
		let str = `2020/10/05`
		//\1 代表匹配的是前面一个原子组的匹配结果为真时的匹配 
		//比如 前一个匹配到-那么后面也必须是- 不能是2020-10/05 这种结构 如果不用\1那么-\都可以组合匹配
		let reg = /^\d{4}([-/])\d{2}\1\d{2}$/
		return str.match(reg) && str.match(reg)[0]
	}
	function urls() {
		let str = `
			http://www.baidu.com
			http://aaa.com
			https://www.bilibili.com
		`
		//?:代表忽略原子组在reg匹配结果中的显示
		let reg = /https?:\/\/((?:\w+\.)?\w+\.(?:com|org|cn))/gi
		let urls = [];
		let res;
		while((res = reg.exec(str))){
			urls.push(res[1])
		}
		return JSON.stringify(urls)
	}
	function replaceLabel(){
		let str = `
			<span>遮天</span>
			<span>我从凡间来</span>
			<span>圣墟</span>
		`
		let reg = /<span>([\s\S]+?)<\/span>/gi
		let result = str.replace(reg, (v,p1) =>{
			return `<h4 style="color:red">${p1}</h4>`
		})
		return result
	}
	function matchAllStr(){
		let str = `
			<h1>遮天</h1>
			<h2>我从凡间来</h2>
			<h3>圣墟</h3>
		`
		//手写matchAll 
		String.prototype.matchAll2 = function(reg){
			let res = this.match(reg)
			if(res){
				let str = this.replace(res[0],'^'.repeat(res[0].length))
				let match = str.matchAll2(reg) || [];
				return [res,...match]
			}
		} 
		//封装的函数 使用exec进行匹配
		function search(string,reg){
			let result = [];
			let res;
			while((res = reg.exec(string))){
				result.push(res)
			}
			return result
		}
		
		//let reg = /<(h[1-6])>([\s\S]+?)<\/h[1-6]>/i matchAll2的正则不用加g
		let reg = /<(h[1-6])>([\s\S]+?)<\/h[1-6]>/gi
		//console.log('search',search(str,reg))
		const regResult = str.matchAll(reg)
		const result = []
		for (const iterator of regResult) {
			result.push(iterator[2])
			//console.dir(iterator)
		}
		
		return JSON.stringify(result)
	}
	function replace$and(){
		let str = `
			<h4>遮天</h4>
			<h4>我从凡间来</h4>
			<h4>圣墟</h4>
		`
		return str.replace(/遮天/g,`<a href="//book.qidian.com/info/1735921"  target="_blank">$&</a>`)
	}
	return (
		<div>
			<h4>输入检测的字符或者正则高亮显示匹配</h4>
			<input type="text" onInput={(e) => { inputChange(e) }} />
			<button onClick={setValue}>确定</button>
			<a href="http://" rel="noopener noreferrer"></a>
			<p>
				<Template />
			</p>
			<h4>匹配电话号 010-9999999 {tel('010-9999999').toString()}</h4>
			<h4>匹配浏览器地址 https://www.baidu.com {url('https://www.baidu.com').toString()}</h4>
			<h4>输入用户名检测是否匹配 （由字母数字或中文组成的2-6位用户名）  {userName.match(/^(\w|\d|[\u4e00-\u9fa5]){2,6}$/) ? '匹配' : '不匹配'}  </h4>
			<input type="text" onInput={(e) => { inputUserChange(e) }} />
			<h4>匹配元字符 {` 张三:010-12011012 , 李四：020-11012011`.match(/[^-\d:：,\s]/g)}  </h4>
			<h4>匹配email {`1184405532@qq.com`.match(/^\w+@\w+\.\w+$/)}  </h4>
			<h4>替换d并且不区分大小写为你想要的字符 {`abcdDefgDDd`.replace(/d/gi, 'z')}  </h4>
			<h4>匹配多行字符并转换为对象结构   {JSON.stringify(manyString())}</h4>
			<h4>匹配日期2020-10-05或者2020/10/05    结果：{regDate()}</h4>
			<h4>抓取字符串中的域名    结果：{urls()}</h4>
			<h4>禁止贪婪，并替换标签 结果：<span dangerouslySetInnerHTML={{ __html: replaceLabel() }}></span></h4>
			<h4>使用macthAll进行全局匹配 结果：{matchAllStr()}</h4>
			<h4>使用$&进行匹配结果替换：<span dangerouslySetInnerHTML={{ __html: replace$and() }}></span></h4>
		</div>
	)
}
export default RegReplace