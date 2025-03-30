export function getCurrentLanguage() {
    return localStorage.getItem("language") || "ko-KR";
  }
  
  export function setCurrentLanguage(lang: "ko-KR" | "en-US") {
    localStorage.setItem("language", lang);
  }