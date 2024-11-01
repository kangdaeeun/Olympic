import { useState } from "react";
import './App.css';

function App() {
    const [inputCountry, setInputCountry] = useState("");
    const [gold, setGold] = useState("");
    const [silver, setSilver] = useState("");
    const [bronze, setBronze] = useState("");
    const [countryArr, setCountryArr] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (countryArr.some(countryArr2 => countryArr2.country === inputCountry)) {
            alert('이미 등록된 국가입니다!');
            resetForm();
            return;
        } else if (inputCountry) {
            setCountryArr([...countryArr, {
                country: inputCountry,
                gold: Number(gold),
                silver: Number(silver),
                bronze: Number(bronze),
                id: Date.now()
            }])
            resetForm();
        }
    }

    const resetForm = () => {
        setInputCountry("");
        setGold("");
        setSilver("");
        setBronze("");
    }

    const updateHandler = (e) => {
        e.preventDefault();
        const existedCountry = countryArr.some(countryArr2 => countryArr2.country === inputCountry)
        if (!existedCountry) {
            alert('등록되지 않은 국가입니다!');
            return;
        }
        const updateCountry = countryArr.map(function (countryArr2) {
            if (countryArr2.country === inputCountry) {
                return {
                    ...countryArr, 
                    country: inputCountry,
                    gold: Number(gold),
                    silver: Number(silver),
                    bronze: Number(bronze),
                    id: Date.now(),
                }
            } else {
                return countryArr2;
            }
        })
        setCountryArr(updateCountry);
        resetForm();
    }


    const sortedCountry = [...countryArr].sort((a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze)

    const deleteHandler = (id) => {
        const newBuild = countryArr.filter((countryArr) => countryArr.id !== id);
        setCountryArr(newBuild);
    }


    return <div
        style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
        }}>

        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'green',
                alignItems: 'center',
            }}>
            <h1>2024 파리 올림픽</h1>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px'
                }}>
                <div>국가명</div>
                <input type="text" value={inputCountry} onChange={(e) => {
                    setInputCountry(e.target.value);
                }} placeholder="국가 입력" />
                <div>금메달</div>
                <input type="number" value={gold} onChange={(e) => {
                    setGold(e.target.value);
                }} placeholder="0" />
                <div>은메달</div>
                <input type="number" value={silver} onChange={(e) => {
                    setSilver(e.target.value);
                }} placeholder="0" />
                <div>동메달</div>
                <input type="number" value={bronze} onChange={(e) => {
                    setBronze(e.target.value);
                }} placeholder="0" />
                <button onClick={handleSubmit}>국가 추가</button>
                <button onClick={updateHandler}>업데이트</button>
            </form>

            <div className="pStyle">
                <div
                    style={{
                        display: "flex",
                    }}>
                    <p>국가명</p>
                    <p>금메달</p>
                    <p>은메달</p>
                    <p>동메달</p>
                    <p>&times;</p>
                </div>
                {sortedCountry.map((data, index) => (
                    <div
                        style={{
                            display: "flex",
                        }}
                        className={`medal-info ${index % 2 === 0 ? "even" : "odd"}`}
                        key={index}
                    >
                        <p>{data.country}</p>
                        <p>{data.gold}</p>
                        <p>{data.silver}</p>
                        <p>{data.bronze}</p>
                        <p><button onClick={() => deleteHandler(data.id)}>삭제</button></p>
                    </div>
                ))}
            </div>
        </div>
    </div>
}
export default App