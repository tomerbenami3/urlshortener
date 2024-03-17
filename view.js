document.addEventListener("DOMContentLoaded", () => {
  const longURL = document.getElementById("LongToShort");
  const shortURL = document.getElementById("ShortToLong");

  const handleEnterKeydown = (event) => {
    if (event.key === "Enter") {
      const inputId = event.target.id;
      const inputValue = event.target.value;
      console.log(`${inputId} received: ${inputValue}`);
      console.log(event, event.target)

      if (inputId === "LongToShort") {
        fetch("/url/long-to-short", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: inputId, value: inputValue }),
        })
          .then((response) => response.json())
          .then(
            (data) =>
              (document.querySelector(".message").textContent = data.message)
          )
          .catch((error) => console.error("Error:", error));
        ////// Second input - 
      } else if (inputId === "ShortToLong") {
        fetch("/url/short-to-long", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: inputValue }),
        })
          .then((response) => response.json())
          .then((data) => {
            document.querySelector(".message").textContent = data.message;
          })
          .catch((error) => console.error("Error:", error));
      }
      document.querySelector(".LongToShort").value = "";
      document.querySelector(".ShortToLong").value = "";
      event.preventDefault();
    }
  };

  longURL.addEventListener("keydown", handleEnterKeydown);
  shortURL.addEventListener("keydown", handleEnterKeydown);
});
