import "./App.css";
import React from 'react'


function Arama({aramaMetni,onSearch}) {
    const handleChange = (event)=>{
    onSearch(event);
  };
  return (
    <div>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text"  onChange={handleChange} value={aramaMetni}/>
    </div>
  );
}

function Yazi({id,url,baslik,yazar,yorum_sayisi,puan}){
  return(
    <li key={id}>
            <span>
              <a href={url}>{baslik}</a>,
            </span>
            <span><b>Yazar:</b> {yazar}, </span>
            <span><b>Yorum Sayısı:</b> {yorum_sayisi}, </span>
            <span><b>Puan:</b> {puan}</span>
          </li>
  )
}

function Liste(props) {
  return (
    <ul>
      {props.yazilar.map(function (yazi) {
        return (
          <Yazi key={yazi.id} {...yazi} />
        );
      })}{" "}
    </ul>
  )
}

function App() {
  const [aramaMetni,setAramaMetni]=React.useState(localStorage.getItem("aranan") || "React" );
  const yaziListesi = [
    {
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1,
    },
    {
      baslik: "ASP.NET",
      url: "wwww.google.com.tr",
      yazar: "Yusuf Baysağdıç",
      yorum_sayisi: 20,
      puan: 3,
      id: 2,
    },
    {
      baslik: "C# Application",
      url: "wwww.google.com.tr",
      yazar: "Bilinmiyor",
      yorum_sayisi: 14,
      puan: 7,
      id: 3,
    },
  ];
  React.useEffect(() =>{
    localStorage.setItem("aranan",aramaMetni);
  },[aramaMetni]);

  const arananYazilar=yaziListesi.filter(
    (item) =>
    item.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    item.yazar.toLowerCase().includes(aramaMetni.toLowerCase())
  );
  //1. Aşama callback handler metodu oluşturma
  function handleSearch(event){
      console.log(event.target.value);
      setAramaMetni(event.target.value);
  }
  return (
    <div>
      <h1>Yazılar</h1>
      <Arama aramaMetni={aramaMetni} onSearch={handleSearch} />
      <p>
      <strong>{aramaMetni} aranıyor...</strong>
      </p>
      <hr />
      <Liste yazilar={arananYazilar}/>
    </div>
  );
}
export default App;
