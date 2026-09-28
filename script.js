// 도시별 좌표 목록 (Open-Meteo 무료 API)
const CITIES = {
  seoul: { name: '서울 (Seoul)' },
  busan: { name: '부산 ()' },
  jeju: { name: '제주 ()'},
  gwangju: { name: '광주 ()' }
};

const logBox = document.getElementById('logBox');
const resultCard = document.getElementById('resultCard');
const cityNameEl = document.getElementById('cityName');
const cityTempEl = document.getElementById('cityTemp');
const cityExtraEl = document.getElementById('cityExtra');

function log(msg) {
  const time = new Date().toLocaleTimeString();
  logBox.textContent += `\n[${time}] ${msg}`;
  logBox.scrollTop = logBox.scrollHeight;
}

function clearLog() {
  logBox.textContent = '> 콘솔이 초기화되었습니다.';
}

// 버튼 클릭 이벤트
document.getElementById('btnFetch').addEventListener('click', () => {
  const cityKey = document.getElementById('citySelect').value;
  const target = CITIES[cityKey];
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityKey}&units=metric&lang=kr&appid=${OPENWEATHER_API_KEY}`;
//   const url = `https://api.open-meteo.com/v1/forecast?latitude=${target.lat}&longitude=${target.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  log(`1. fetch() 주문서 발송: ${target.name}`);
  resultCard.classList.add('d-none');

  // ==========================================================
  // [핵심] 오직 fetch와 .then() 체인만 사용하는 기본 문법
  // ==========================================================
  fetch(url)
    .then((response) => {
      log(`2. 서버 응답 도착 (HTTP 상태 코드: ${response.status})`);
      if (!response.ok) {
        throw new Error(`HTTP 에러 발생: ${response.status}`);
      }
      log("2-1")
      // 응답 본문을 JSON 객체로 파싱하여 다음 then으로 전달
      return response.json();
      //의미없음 log("2-2")
    })
    .then((data) => {
    log('3-0')
    console.log(data)
    //   const current = data.current;
      log(`3. JSON 번역 완료! 기온: ${data.main.temp}℃ / 습도: ${data.main.humidity}%`);

      // 화면에 표시
      cityNameEl.textContent = target.name;
      log('3-2')
      cityTempEl.textContent = `${data.main.temp} ℃`;
      cityExtraEl.textContent = `습도: ${data.main.humidity}% | 풍속: ${data.wind.speed} km/h`;
      resultCard.classList.remove('d-none');
    })
    .catch((error) => {
      log(`❌ 에러 발생: ${error.message}`);
      alert(`날씨 정보를 가져오지 못했습니다: ${error.message}`);
    })
    .finally(() => {
      log(`4. fetch 요청 사이클 완료`);
    });
});
