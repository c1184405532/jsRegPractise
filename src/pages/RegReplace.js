
//import React from 'react';
import React,{ useState, useEffect,useRef } from 'react';
let value;
function RegReplace(){

    const [inputValue,setinputValue] = useState(null)
    const [userName,setUserName] = useState('')
    function inputChange(e){
        value = e.target.value;
        //setinputValue()
        //setTimeout(()=>{
            console.log(e.target.value)
        //})
    }
    
    function Template(){
        let str = `何为凡人，何为仙，岂闻韶华尽何年，回首沧桑，此恨绵绵，风月如剑，看我破天。道不尽仙凡殊途，尽人间。英文abcdefg，数字123456`;
        let reg = new RegExp(inputValue,'g')
        str = str.replace(reg,serach=>{
            return `<span style="color:red;">${serach}</span>`;
        })
        //console.log(str)
        return (<span dangerouslySetInnerHTML={{ __html:str}} />);
    }
    function setValue(){
        setinputValue(value)
    }
    function tel(number){
        //以010或者020开始 后面跟上一个- \-转义成实际字符 \d 匹配数字 {7,8} 7-八位
        return /^(010|020)\-\d{7,8}/.test(number)
    }
    function url(path){
        //以http开头 s?有0个或者一个s \/\/两个转义双斜杆 \w匹配单词 +\.跟上一个字符串. 然后继续跟上\w单词 继续跟上上一个字符串. \.
        //最后\w匹配单词结尾
        return /^https?:\/\/\w+\.\w+\.\w+/.test(path)
    }
    function inputUserChange(e){
        ///^(\w|\d|[\u4e00-\u9fa5]){3,6}$/)
        // 以字母 或者 数字 或中文字符开始 字符长度为3-6位
        setUserName(e.target.value)
    };
    return (
        <div>
            <h4>输入检测的字符或者正则高亮显示匹配</h4>
            <input type="text"  onInput={(e)=>{inputChange(e)}}/>
            <button onClick={setValue}>确定</button>
            <p>
                <Template/>
            </p>
            <h4>匹配电话号 010-9999999 {tel('010-9999999').toString()}</h4>
            <h4>匹配浏览器地址 https://www.baidu.com {url('https://www.baidu.com').toString()}</h4>
            <h4>输入用户名检测是否匹配 （由字母数字或中文组成的3-6位用户名）  {userName.match(/^(\w|\d|[\u4e00-\u9fa5]){3,6}$/)?'匹配':'不匹配'}  </h4>
            <input type="text"  onInput={(e)=>{inputUserChange(e)}}/>
        </div>
    )
}
export default RegReplace