var voices = [];
function setVoiceList() {
  voices = window.speechSynthesis.getVoices();
}

setVoiceList();

if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = setVoiceList;
}

function speech(txt, lang = "vi-VN") {
  if (!window.speechSynthesis) {
    alert(
      "음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요"
    );
    return;
  }

  var utterThis = new SpeechSynthesisUtterance(txt);

  utterThis.onend = function (event) {
    console.log("end");
  };

  utterThis.onerror = function (event) {
    console.log("error", event);
  };

  var voiceFound = false;

  for (var i = 0; i < voices.length; i++) {
    if (
      voices[i].lang.indexOf(lang) >= 0 ||
      voices[i].lang.indexOf(lang.replace("-", "_")) >= 0
    ) {
      utterThis.voice = voices[i];
      voiceFound = true;
      break;
    }
  }

  if (!voiceFound) {
    alert("음성을 찾을 수 없습니다.");
    return;
  }

  utterThis.lang = lang;
  utterThis.pitch = 1;
  utterThis.rate = 1;

  window.speechSynthesis.speak(utterThis);
}

function g_gout() {
  var t = document.getElementById("code_reddit");
  speech(t.value);
}

function logAvailableVoices() {
  voices.forEach((voice) => {
    console.log(`${voice.name} (${voice.lang})`);
  });
}
const mainList = document.getElementById("mainList");
const userText = document.getElementById("userText");
const textClose = document.querySelector(".textClose");

userText.addEventListener("input", function () {
  if (userText.value.length > 0) {
    textClose.classList.add("on");
  } else {
    textClose.classList.remove("on");
  }
});

textClose.addEventListener("click", function () {
  userText.value = "";
  textClose.classList.remove("on");
});

document.querySelector(".submit").addEventListener("click", function () {
  document.getElementById("code_reddit").value = "Không sao chứ?";
});

function g_gout() {
  var t = document.getElementById("code_reddit");
  speech(t.value);
}

function handleListOn() {
  mainList.classList.add("on");
}

logAvailableVoices();
