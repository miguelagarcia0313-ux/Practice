/* ============================================================
   Assignment: JavaScript Class Basics
   Topic: An Exercise class for a workout-tracking app
   ============================================================ */

// -----------------------------------------------------------
// TAB SWITCHING
// this just handles clicking the split buttons and showing
// the right panel while hiding the other three
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.split-tab');
  const panels = document.querySelectorAll('.split-panel');

  const showSplit = (targetId) => {
    panels.forEach((panel) => {
      const isMatch = panel.id === targetId;
      panel.hidden = !isMatch;
      panel.classList.toggle('is-active', isMatch);
    });

    tabs.forEach((tab) => {
      const isMatch = tab.dataset.target === targetId;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => showSplit(tab.dataset.target));
  });
});

/* -----------------------------------------------------------
 (a) CLASS + CONSTRUCTOR
 This class is basically a blueprint for one exercise. Every
 time I make a new Exercise, the constructor runs and fills in
 the starting info: name, muscle group, sets/reps, and the
 starting weight goal. */

class Exercise {

  /* ---------------------------------------------------------
   (b) PRIVATE FIELD
   The # in front of minWeight makes it private, so nothing
   outside the class can touch it directly. If I tried
   exercise.#minWeight from outside, it would just error out.
   The only way to change it is through the setter below, which
   checks the value first before actually changing anything. */
  #minWeight; 

  constructor(name, muscleGroup, minWeight, sets = 4, reps = 10) {
    this.name = name;                 // exercise name
    this.muscleGroup = muscleGroup;   // muscle group it targets
    this.sets = sets;                 // number of sets
    this.reps = reps;                 // reps per set
    this.#minWeight = minWeight;      // private field, set here in the constructor
  }

  /* ---------------------------------------------------------
   (d) GETTER
   This lets me grab the private #minWeight from outside the
   class like it's a normal property, e.g. squat.minWeight,
   without actually giving outside code direct access to it. */
  get minWeight() {
    return this.#minWeight;
  }

  /* ---------------------------------------------------------
   (d) SETTER
   This lets me update #minWeight from outside, e.g.
   squat.minWeight = 150, but it checks the number is valid
   first. That's the whole reason I made the field private —
   so every update has to pass through this check. */
  set minWeight(newWeight) {
    if (typeof newWeight === "number" && newWeight >= 0) {
      this.#minWeight = newWeight;
    } else {
      console.warn(`Invalid weight "${newWeight}" ignored for ${this.name}.`);
    }
  }

  /* ---------------------------------------------------------
   (c) INSTANCE METHOD #1
   Just puts together a readable sentence about the exercise,
   using the public fields plus the private weight. */
  displayInfo() {
    return `${this.name} (${this.muscleGroup}): ${this.sets} sets x ${this.reps} reps, min weight ${this.#minWeight} lbs.`;
  }

  /* ---------------------------------------------------------
   (c) INSTANCE METHOD #2
   Bumps the min weight up by whatever amount I pass in — like
   when I actually get stronger and want to raise the goal.
   Returns the new number so I can see it right away. */
  increaseWeight(amount) {
    if (typeof amount === "number" && amount > 0) {
      this.#minWeight += amount;
    }
    return this.#minWeight;
  }

  /* ---------------------------------------------------------
   (c) INSTANCE METHOD #3
   Checks if the current min weight is at or above some
   threshold (100 lbs unless I say otherwise) and just returns
   true or false — an easy way to flag the heavier lifts. */
  isHeavyLift(threshold = 100) {
    return this.#minWeight >= threshold;
  }
}

/* -----------------------------------------------------------
 (e) MAKING AT LEAST THREE OBJECTS WITH "new"
 Every time I write "new Exercise(...)" it builds a completely
 separate object, each with its own private #minWeight that
 the others can't see or mess with. */
const inclineBarbellPress = new Exercise("Incline Barbell Press", "Chest", 95, 4, 8);
const latPulldown = new Exercise("Lat Pulldown", "Back", 80, 4, 12);
const backSquat = new Exercise("Back Squat", "Quads", 135, 4, 5);
const plank = new Exercise("Plank", "Core", 0, 4, 1); // bodyweight hold, "reps" here just means hold count

// -----------------------------------------------------------
// (f) CALLING THE METHODS

// print info for all four
console.log(inclineBarbellPress.displayInfo());
console.log(latPulldown.displayInfo());
console.log(backSquat.displayInfo());
console.log(plank.displayInfo());

// use the setter, then the getter to check it actually changed
backSquat.minWeight = 145;
console.log(`Back Squat min weight is now: ${backSquat.minWeight} lbs.`);

// try a bad value on purpose to prove the setter's check works
backSquat.minWeight = -20; // gets rejected, prints a warning, weight stays 145

// bump up the incline press weight
inclineBarbellPress.increaseWeight(5);
console.log(inclineBarbellPress.displayInfo());

// check which ones count as "heavy"
console.log(`Is the Back Squat heavy? ${backSquat.isHeavyLift(120)}`);
console.log(`Is the Plank heavy? ${plank.isHeavyLift(120)}`);

/* ============================================================
   SOURCES
   - MDN Web Docs, "Classes":
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
   - MDN Web Docs, "Private class features":
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties
   - MDN Web Docs, "getter":
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
   - MDN Web Docs, "setter":
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
   ============================================================ */