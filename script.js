const glassesContainer = document.querySelector(".glasses_items");
const remainded = document.querySelector(".remainded");
const remaindedLitres = document.querySelector(".remainded_litres");
const percentage = document.querySelector(".drinked");
const drinkedPercentage = document.querySelector(".drinked-percentage");
const goal = document.querySelector(".goal");
const setGoal = document.querySelector(".setGoal");
const glasses = document.querySelectorAll(".glass");
const slider = document.querySelector(".slider-range");
const value = document.querySelector(".value");
value.textContent = slider.value;
goal.innerText = slider.value;

glasses.forEach((glass, idx) => {
  glass.addEventListener("click", () => highLightCups(idx));
});

sliderEventListener();
slider.addEventListener("input", () => {
  sliderEventListener();
});

function sliderEventListener() {
  let countBefore = goal.innerText;

  value.textContent = slider.value;
  goal.innerText = slider.value;
  remaindedLitres.innerHTML = goal.innerText + "L";
  let countAfter = goal.innerText;

  let firstIdx = countBefore * 4;
  let secondIdx = countAfter * 4 - 1;

  glasses.forEach((glass, idx) => {
    if (countBefore < countAfter) {
      for (idx = firstIdx; idx <= secondIdx; idx++) {
        glasses[idx].classList.remove("hidden");
      }
    } else if (countBefore > countAfter) {
      for (idx = secondIdx + 1; idx < firstIdx; idx++) {
        glasses[idx].classList.add("hidden");
      }
    }
  });
}
function highLightCups(idx) {
  const glasses = document.querySelectorAll(".glass");
  const targetGlass = glasses[idx];
  const nextGlass = glasses[idx + 1];
  const isNextGlassFull =
    nextGlass !== undefined && nextGlass.classList.contains("full");

  const done = `<span class="material-symbols-outlined">
done
</span>`;

  glasses.forEach((glass, idx2) => {
    if (isNextGlassFull) {
      if (idx2 <= idx) {
        glass.classList.add("full");
        glass.innerText = "";
        glass.insertAdjacentHTML("beforeend", done);
      } else {
        glass.classList.remove("full");
        glass.innerText = "250 ml";
      }
    }

    if (targetGlass.classList.contains("full") && idx2 >= idx) {
      glass.classList.remove("full");
      glass.innerText = "250 ml";
    } else if (idx2 <= idx) {
      console.log(idx2, idx);

      glass.classList.add("full");
      glass.innerText = "";
      glass.insertAdjacentHTML("beforeend", done);
    }
  });

  updateRemaindedWater();
}
function updateRemaindedWater() {
  const fullGlasses = document.querySelectorAll(".glass.full").length;
  const totalGlasses = document.querySelectorAll(".glass").length;
  const hiddenGlasses = document.querySelectorAll(".hidden").length;
  const visibleGlasses = totalGlasses - hiddenGlasses;

  if (fullGlasses === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullGlasses / visibleGlasses) * 200}px`;
    drinkedPercentage.innerText = `${(
      (fullGlasses / visibleGlasses) *
      100
    ).toFixed(1)}%`;
  }

  if (fullGlasses === visibleGlasses) {
    remainded.style.visibility = "hidden";
    remainded.style.height = 0;
  } else {
    remainded.style.visibility = "visible";
    remaindedLitres.innerText = `${
      visibleGlasses * 0.25 - fullGlasses * 0.25
    }L`;
  }
}
