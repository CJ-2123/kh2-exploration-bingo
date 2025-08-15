// Custom json list
let customList = null;
let fileContent = "";

// File uploader for custom lists
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      fileContent = e.target.result;
      console.log("File content loaded:", fileContent);
      if (fileContent) {
        try {
          sessionStorage.setItem("customList", fileContent);
          console.log(sessionStorage.getItem("customList"));
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
      } else {
        console.log("No file selected or file is empty");
      }
    };
    reader.readAsText(file);
  }
}

// Change state of bingo logic checkbox
function toggleBingoLogic() {
  if (document.getElementById("bingologic").checked) {
    $("#bingologiccheck").prop("checked", true);
  } else {
    $("#bingologiccheck").prop("checked", false);
  }
}

// function to create bingo board
var bingo = function (size) {
  if (typeof size == "undefined") size = 5;

  function gup(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    return results[1];
  }

  var SEED = gup("seed");
  var CUSTOM = gup("custom");
  var TYPE = gup("type");
  var MODE = gup("mode");
  // var SIZE =
  //   MODE == "roguelike"
  //     ? 13
  //     : Number.isInteger(parseInt(gup("size")))
  //     ? parseInt(gup("size"))
  //     : size;
  var SIZE;

  // Read size selected
  if (Number.isInteger(parseInt(gup("size")))) {
    SIZE = parseInt(gup("size"));
  } else {
    SIZE = size;
  }

  const sizeRequirements = {
    20: 169,
    15: 82,
    13: 169,
    9: 38,
    5: 25,
    4: 16,
    3: 9,
  };

  // Check that custom list meets size requirements
  customList = JSON.parse(sessionStorage.getItem("customList"));
  if (TYPE == "custom" && customList == null) {
    alert("No file selected or file is empty");
  }

  if (TYPE === "custom") {
    if (customList.length < sizeRequirements[SIZE]) {
      alert(
        "Not enough goals to meet the size requirements for selected settings."
      );
    }
  }

  // Adjust size for roguelike mode
  if (MODE == "roguelike") {
    switch (SIZE) {
      case 9:
        SIZE = 7;
        break;
      case 15:
        SIZE = 9;
        break;
      case 20:
        SIZE = 13;
        break;
    }
  }

  // Warnings for board size
  if (TYPE == "bunter" && SIZE == 13) {
    alert("Cannot play bunter with size 13 board.");
  } else if (MODE == "roguelike" && TYPE == "bunter" && SIZE == 9) {
    alert("Cannot play bunter with 15 layer roguelike");
  } else if (MODE == "roguelike" && TYPE == "bunter" && SIZE == 13) {
    alert("Cannot play bunter with 20 layer roguelike");
  }

  // check if images are being used for goals
  var imageGoals;
  if (TYPE == "bunterImage" || TYPE == "kh1Image") {
    imageGoals = true;
  }

  var START = gup("start");
  var GOAL = gup("goal");
  var LANG = gup("lang");

  var slots = [];
  var defaultStartSlots = [];
  var defaultGoalSlots = [];
  var startSlots = [];
  var interSlots = [];
  var goalSlots = [];
  var tlbrSlots = [];
  var bltrSlots = [];

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  // Set appearance and assign special slots for each board mode
  if (
    (MODE == "roguelike" && TYPE == "bunter") ||
    (MODE == "roguelike" && TYPE == "bunterImage") ||
    (MODE == "roguelike" && SIZE == 7)
  ) {
    $("#bingo-standard").remove();
    $("#bingo-large").remove();
    $("#bingo-roguelike").remove();
    $("#bingo-roguelike-3").remove();
    $(".container").css("width", "1240px");
    $("#roguelike").prop("checked", true);
    // $("#size5").prop("checked", true);
    $("#size9").prop("checked", true);
    $("#size-radio").hide();
    $("#exploration-init").hide();
    $("#bingologiccheck").hide();
    $("#bingologiccheck").prop("checked", false);
    $("#jsonFormat").hide();
    // startSlots = [7];
    // interSlots = [98, 150, 202];
    // goalSlots = [254];
    startSlots = [4];
    interSlots = [32, 46];
    goalSlots = [60];
  } else if (MODE == "roguelike" && SIZE == 13) {
    $("#bingo-standard").remove();
    $("#bingo-large").remove();
    $("#bingo-roguelike-2").remove();
    $("#bingo-roguelike-3").remove();
    $(".container").css("width", "1800px");
    $("#roguelike").prop("checked", true);
    // $("#size5").prop("checked", true);
    $("#size20").prop("checked", true);
    $("#size-radio").hide();
    $("#exploration-init").hide();
    $("#bingologiccheck").hide();
    $("#bingologiccheck").prop("checked", false);
    $("#jsonFormat").hide();
    startSlots = [7];
    interSlots = [98, 150, 202];
    goalSlots = [254];
  } else if (MODE == "roguelike" && SIZE == 9) {
    $("#bingo-standard").remove();
    $("#bingo-large").remove();
    $("#bingo-roguelike").remove();
    $("#bingo-roguelike-2").remove();
    $(".container").css("width", "1400px");
    $("#roguelike").prop("checked", true);
    // $("#size5").prop("checked", true);
    $("#size15").prop("checked", true);
    $("#size-radio").hide();
    $("#exploration-init").hide();
    $("#bingologiccheck").hide();
    $("#bingologiccheck").prop("checked", false);
    $("#jsonFormat").hide();
    startSlots = [5];
    interSlots = [50, 77, 104];
    goalSlots = [131];
  } else {
    if (MODE == "exploration") {
      $("#exploration").prop("checked", true);
      $("#size-radio2").hide();
      $("#jsonFormat").hide();
      if (SIZE != 13) {
        $("#exploration-init-form").hide();
      } else {
        $("#exploration-init-table").hide();
      }
    } else {
      $("#standard").prop("checked", true);
      $("#exploration-init").hide();
      $("#size-radio2").hide();
    }

    if (SIZE == 13) {
      $("#bingo-standard").remove();
      $("#bingo-roguelike").remove();
      $("#bingo-roguelike-2").remove();
      $("#bingo-roguelike-3").remove();
      $("#bingologiccheck").hide();
      $("#bingologiccheck").prop("checked", false);
      $("#jsonFormat").hide();
      $(".container").css("width", "1800px");
      $("#size13").prop("checked", true);
      slots = range(1, 169);
      defaultStartSlots = [85];
      defaultGoalSlots = [1, 13, 157, 169];
      tlbrSlots = [1, 15, 29, 43, 57, 71, 85, 99, 113, 127, 141, 155, 169];
      bltrSlots = [13, 25, 37, 49, 61, 73, 85, 97, 109, 121, 133, 145, 157];
    } else if (SIZE == 3) {
      $("#bingo-large").remove();
      $("#bingo-roguelike").remove();
      $("#bingo-roguelike-2").remove();
      $("#bingo-roguelike-3").remove();
      $("#bingologiccheck").hide();
      $("#bingologiccheck").prop("checked", false);
      $("#size3").prop("checked", true);
      slots = [1, 2, 3, 6, 7, 8, 11, 12, 13];
      defaultStartSlots = [1, 13];
      tlbrSlots = [1, 7, 13];
      bltrSlots = [3, 7, 11];
    } else if (SIZE == 4) {
      $("#bingo-large").remove();
      $("#bingo-roguelike").remove();
      $("#bingo-roguelike-2").remove();
      $("#bingo-roguelike-3").remove();
      $("#bingologiccheck").hide();
      $("#bingologiccheck").prop("checked", false);
      $("#size4").prop("checked", true);
      slots = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19];
      defaultStartSlots = [7, 13];
      tlbrSlots = [1, 7, 13, 19];
      bltrSlots = [4, 8, 12, 16];
    } else {
      $("#bingo-large").remove();
      $("#bingo-roguelike").remove();
      $("#bingo-roguelike-2").remove();
      $("#bingo-roguelike-3").remove();
      $("#bingologiccheck").prop("checked", false);
      $("#size5").prop("checked", true);
      slots = range(1, 25);
      defaultStartSlots = [7, 19];
      tlbrSlots = [1, 7, 13, 19, 25];
      bltrSlots = [5, 9, 13, 17, 21];
    }

    startSlots = START.split("-").map((str) => parseInt(str));
    if (
      START != "0" &&
      !startSlots.some((num) => {
        return slots.includes(num);
      })
    ) {
      startSlots = defaultStartSlots;
    } else {
      startSlots = startSlots.filter((x) => {
        return !Number.isNaN(x) && slots.includes(x);
      });
    }

    goalSlots = GOAL.split("-").map((str) => parseInt(str));
    if (
      GOAL != "0" &&
      !goalSlots.some((num) => {
        return slots.includes(num);
      })
    ) {
      goalSlots = defaultGoalSlots;
    } else {
      goalSlots = goalSlots.filter((x) => {
        return !Number.isNaN(x) && slots.includes(x);
      });
    }

    slots.forEach((slot) => {
      if (startSlots.includes(slot)) {
        $("#init-slot" + slot)
          .text("S")
          .addClass("bluesquare");
      } else if (goalSlots.includes(slot)) {
        $("#init-slot" + slot)
          .text("G")
          .addClass("yellowsquare");
      }
    });

    $("#exploration-init-form-start").val(startSlots.join("-"));
    $("#exploration-init-form-goal").val(goalSlots.join("-"));
  }

  $(".container").show();

  // Seed string
  if (CUSTOM == "1") {
    $("#custom-seed").prop("checked", true);
    $("#seed").prop("disabled", false);
  } else {
    $("#random-seed").prop("checked", true);
    $("#seed").prop("disabled", true);
  }

  $("#seed").val(SEED);

  //if (SEED == "" || isNaN(SEED)) return reseedPage(TYPE);

  var cardtype = "string";

  console.log(TYPE);

  // if (TYPE == "short") { cardtype = "Long"; }
  // else { cardtype = "Normal"; }

  // Get card type
  switch (TYPE) {
    case "short":
      cardtype = "Short";
      break;
    case "long":
      cardtype = "Long";
      break;
    case "kh2":
      cardtype = "KH2";
      break;
    case "bossrando":
      cardtype = "Boss-Rando";
      break;
    case "kh1":
      cardtype = "KH1";
      break;
    case "kh1E":
      cardtype = "KH1 Easy";
      break;
    case "kh1M":
      cardtype = "KH1 Normal";
      break;
    case "kh1H":
      cardtype = "KH1 Hard";
      break;
    case "kh1N":
      cardtype = "KH1 Nightmare";
      break;
    case "kh1Image":
      cardtype = "KH1 Image";
      break;
    case "bunter":
      cardtype = "Bunter";
      break;
    case "bunterImage":
      cardtype = "Bunter Image";
      break;
    case "combo":
      cardtype = "Combo";
      break;
    case "custom":
      cardtype = "Custom";
      break;
    case "terra":
      cardtype = "BBS Terra";
      break;
    case "aqua":
      cardtype = "BBS Aqua";
      break;
    case "ven":
      cardtype = "BBS Ven";
      break;
    case "kh3":
      cardtype = "KH3";
      break;
    case "kh2generic":
      cardtype = "KH2 Generic";
      break;
    case "bbscombo":
      cardtype = "BBS Combo";
      break;
    default:
      cardtype = "Normal";
  }

  Math.seedrandom(SEED); //sets up the RNG

  // Get seed and card type
  var results = $("#results");
  results.append(
    "<p>Seed: <strong>" +
      SEED +
      "</strong>&emsp;Card type: <strong>" +
      cardtype +
      "</strong></p>"
  );

  if (MODE != "roguelike") {
    results.append("<div id='copyResultButton'>Copy Result</div>");
  }

  $("#copyResultButton").click(function () {
    var digits = [
      "1️⃣",
      "2️⃣",
      "3️⃣",
      "4️⃣",
      "5️⃣",
      "6️⃣",
      "7️⃣",
      "8️⃣",
      "9️⃣",
      "0️⃣",
      "1️⃣",
      "2️⃣",
      "3️⃣",
    ];
    var result = SEED;
    // SEED +
    // " " +
    //   cardtype +
    //   "\r\n||#️⃣" +
    //   digits.slice(0, SIZE).join("") +
    //   "\r\n";
    // var j = 0;
    // slots.forEach((slot, i) => {
    //   if (SIZE == 3 || SIZE == 4 ? slot % 5 == 1 : slot % SIZE == 1) {
    //     result = result + digits[j];
    //     j++;
    //   }

    //   if ($("#slot" + slot).hasClass("greensquare")) {
    //     result = result + "🟩";
    //   } else if ($("#slot" + slot).hasClass("redsquare")) {
    //     result = result + "🟥";
    //   } else {
    //     result = result + "⬜";
    //   }

    //   if (SIZE == 3 || SIZE == 4 ? slot % 5 == SIZE : slot % SIZE == 0) {
    //     if (i != slots.length - 1) {
    //       result = result + "\r\n";
    //     } else {
    //       result = result + "||";
    //     }
    //   }
    // });

    navigator.clipboard.writeText(result).then(() => {
      $("#copyResultButton").text("✓");
      $("#copyResultButton").css("pointer-events", "none");
      $("#copyResultButton").css("cursor", "default");
      setTimeout(function () {
        $("#copyResultButton").text("Copy Result");
        $("#copyResultButton").css("pointer-events", "");
        $("#copyResultButton").css("cursor", "pointer");
      }, 1500);
    });
  });

  // Popout windows for standard bingo
  if (MODE == "standard" || MODE == "") {
    $(".popout").click(function () {
      var type = null;
      var line = $(this).attr("id");
      var name = $(this).html();
      var items = [];
      var cells = $(".bingo ." + line);
      for (var i = 0; i < SIZE; i++) {
        items.push(encodeURIComponent($(cells[i]).html()));
      }
      window.open(
        "bingo-popout.html#" + name + "=" + items.join(";;;"),
        "_blank",
        "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=220, height=460"
      );
    });
  }

  // Function to check for bingo in rows, columns, and diagonals
  function checkForBingo() {
    const boardSize = SIZE;
    let bingo = false;

    // Check rows for bingo
    for (let row = 0; row < boardSize + 1; row++) {
      if (checkLine($(`.bingo .row${row}`))) {
        bingo = true;
      }
    }

    // Check columns for bingo
    for (let col = 0; col < boardSize + 1; col++) {
      if (checkLine($(`.bingo .col${col}`))) {
        bingo = true;
      }
    }

    // Check diagonals for bingo
    if (checkLine($(`.bingo .tlbr`)) || checkLine($(`.bingo .bltr`))) {
      bingo = true;
    }
  }

  // Function to check if line is a bingo
  function checkLine(cells) {
    if (cells.length === 0) return false;

    let greenCount = 0;
    let redCount = 0;
    let purpleCount = 0;

    cells.each(function () {
      if ($(this).hasClass("greensquare")) {
        greenCount++;
      } else if ($(this).hasClass("redsquare")) {
        redCount++;
      } else if ($(this).hasClass("purplesquare")) {
        purpleCount++;
      }
    });

    const allGreenOrPurple =
      greenCount + purpleCount === cells.length && greenCount > 0;
    const allRedOrPurple =
      redCount + purpleCount === cells.length && redCount > 0;

    // Turn all squares purple or turn squares green if bingo is broken
    if (allGreenOrPurple || allRedOrPurple) {
      cells.removeClass("greensquare redsquare").addClass("purplesquare");
      return true;
    } else {
      if (purpleCount === cells.length - 1) {
        console.log("true");
        cells.removeClass("purplesquare redsquare").addClass("greensquare");
      }
    }

    return false;
  }

  // Cycle square colors on click
  $("#selected td").toggle(
    function () {
      $(this).addClass("greensquare");
    },
    function () {
      $(this).addClass("redsquare").removeClass("greensquare");
    },
    function () {
      $(this).removeClass("redsquare");
    }
  );

  // Right click toggles star
  $("#bingo-standard tr").on(
    "contextmenu",
    "td:not(.popout):not(.hidden)",
    function (e) {
      e.preventDefault();
      $(this).toggleClass("starred");
    }
  );

  // Set special squares
  $("#bingo-standard tr").on(
    "click",
    "td:not(.popout):not(.hidden)",
    function () {
      if ($(this).hasClass("greensquare")) {
        $(this).addClass("redsquare").removeClass("greensquare");
      } else if ($(this).hasClass("redsquare")) {
        $(this).removeClass("redsquare");
      } else if ($(this).hasClass("purplesquare")) {
        $(this).removeClass("purplesquare");
      } else {
        if ($(this).hasClass("bluesquare")) {
          $(this).removeClass("bluesquare");
          $(this).addClass("blue");
        } else if ($(this).hasClass("yellowsquare")) {
          $(this).removeClass("yellowsquare");
          $(this).addClass("yellow");
        }
        $(this).addClass("greensquare");

        var slot = parseInt($(this).attr("id").slice(4));
        // maybe unhide more goals
        // dividable by 5? nothing to the right
        if (slot % 5 != 0) {
          $("#slot" + (slot + 1)).removeClass("hidden");
        }
        // nothing to the left
        if (slot % 5 != 1) {
          $("#slot" + (slot - 1)).removeClass("hidden");
        }
        // top down doesn't matter
        $("#slot" + (slot + 5)).removeClass("hidden");
        $("#slot" + (slot - 5)).removeClass("hidden");
      }
      if ($("#bingologiccheck").prop("checked")) {
        checkForBingo();
      }
    }
  );

  // Right click toggles star
  $("#bingo-large tr").on(
    "contextmenu",
    "td:not(.popout):not(.hidden)",
    function (e) {
      e.preventDefault();
      $(this).toggleClass("starred");
    }
  );

  // Set special squares
  $("#bingo-large tr").on("click", "td:not(.popout):not(.hidden)", function () {
    if ($(this).hasClass("greensquare")) {
      $(this).removeClass("greensquare").addClass("redsquare");
    } else if ($(this).hasClass("redsquare")) {
      $(this).removeClass("redsquare");
    } else {
      if ($(this).hasClass("bluesquare")) {
        $(this).removeClass("bluesquare");
        $(this).addClass("blue");
      } else if ($(this).hasClass("yellowsquare")) {
        $(this).removeClass("yellowsquare");
        $(this).addClass("yellow");
      }
      $(this).addClass("greensquare");

      var slot = parseInt($(this).attr("id").slice(4));
      // maybe unhide more goals
      // dividable by 5? nothing to the right
      if (slot % SIZE != 0) {
        $("#slot" + (slot + 1)).removeClass("hidden");
      }
      // nothing to the left
      if (slot % SIZE != 1) {
        $("#slot" + (slot - 1)).removeClass("hidden");
      }
      // top down doesn't matter
      $("#slot" + (slot + SIZE)).removeClass("hidden");
      $("#slot" + (slot - SIZE)).removeClass("hidden");
    }
  });

  // Right click toggles star
  $("#bingo-roguelike tr").on(
    "contextmenu",
    "td:not(.popout):not(.hidden):not(.disabled)",
    function (e) {
      e.preventDefault();
      $(this).toggleClass("starred");
    }
  );

  // Set special squares
  $("#bingo-roguelike tr").on(
    "click",
    "td:not(.popout):not(.hidden):not(.disabled)",
    function () {
      $(this).addClass("disabled");

      if ($(this).hasClass("bluesquare")) {
        $(this).removeClass("bluesquare");
        $(this).addClass("blue");
      } else if ($(this).hasClass("redsquare")) {
        $(this).removeClass("redsquare");
        $(this).addClass("red");
      } else if ($(this).hasClass("yellowsquare")) {
        $(this).removeClass("yellowsquare");
        $(this).addClass("yellow");
      }
      $(this).addClass("greensquare");

      var slot = parseInt($(this).attr("id").slice(4));

      if ($("#slot" + slot).hasClass("row7")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot98").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot98");
      } else if ($("#slot" + slot).hasClass("row11")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot150").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot150");
      } else if ($("#slot" + slot).hasClass("row15")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot202").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot202");
      } else if ($("#slot" + slot).hasClass("row19")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot254").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot254");
      }

      // maybe unhide more goals
      // dividable by 5? nothing to the right
      if (slot % SIZE != 0) {
        $("#slot" + (slot + SIZE + 1)).removeClass("hidden");
      }
      // nothing to the left
      if (slot % SIZE != 1) {
        $("#slot" + (slot + SIZE - 1)).removeClass("hidden");
      }
      // top down doesn't matter
      $("#slot" + (slot + SIZE)).removeClass("hidden");

      var row =
        slot % SIZE != 0
          ? Math.floor(slot / SIZE) + 1
          : Math.floor(slot / SIZE);

      $("#row" + row).addClass("currentFloor");
      if (row != 1) {
        $("#row" + (row - 1)).removeClass("currentFloor");
      }

      for (i = 1; i <= 260; i++) {
        if (i != slot && $("#slot" + i).hasClass("row" + row)) {
          $("#slot" + i).addClass("disabled");
          $("#slot" + i).addClass("gray");
        }
      }
    }
  );

  // Right click toggles star
  $("#bingo-roguelike-2 tr").on(
    "contextmenu",
    "td:not(.popout):not(.hidden):not(.disabled)",
    function (e) {
      e.preventDefault();
      $(this).toggleClass("starred");
    }
  );

  // Set special squares
  $("#bingo-roguelike-2 tr").on(
    "click",
    "td:not(.popout):not(.hidden):not(.disabled)",
    function () {
      $(this).addClass("disabled");

      if ($(this).hasClass("bluesquare")) {
        $(this).removeClass("bluesquare");
        $(this).addClass("blue");
      } else if ($(this).hasClass("redsquare")) {
        $(this).removeClass("redsquare");
        $(this).addClass("red");
      } else if ($(this).hasClass("yellowsquare")) {
        $(this).removeClass("yellowsquare");
        $(this).addClass("yellow");
      }
      $(this).addClass("greensquare");

      var slot = parseInt($(this).attr("id").slice(4));

      if ($("#slot" + slot).hasClass("row4")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot32").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot32");
      } else if ($("#slot" + slot).hasClass("row6")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot46").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot46");
        // } else if ($("#slot" + slot).hasClass("row15")) {
        //   $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        //   $("#slot202").attr("id", "slot" + (slot + SIZE));
        //   $("#slotTemp").attr("id", "slot202");
      } else if ($("#slot" + slot).hasClass("row8")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot60").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot60");
      }

      // maybe unhide more goals
      // dividable by 5? nothing to the right
      if (slot % SIZE != 0) {
        $("#slot" + (slot + SIZE + 1)).removeClass("hidden");
      }
      // nothing to the left
      if (slot % SIZE != 1) {
        $("#slot" + (slot + SIZE - 1)).removeClass("hidden");
      }
      // top down doesn't matter
      $("#slot" + (slot + SIZE)).removeClass("hidden");

      var row =
        slot % SIZE != 0
          ? Math.floor(slot / SIZE) + 1
          : Math.floor(slot / SIZE);

      $("#row" + row).addClass("currentFloor");
      if (row != 1) {
        $("#row" + (row - 1)).removeClass("currentFloor");
      }

      for (i = 1; i <= 63; i++) {
        if (i != slot && $("#slot" + i).hasClass("row" + row)) {
          $("#slot" + i).addClass("disabled");
          $("#slot" + i).addClass("gray");
        }
      }
    }
  );

  // Right click toggles star
  $("#bingo-roguelike-3 tr").on(
    "contextmenu",
    "td:not(.popout):not(.hidden):not(.disabled)",
    function (e) {
      e.preventDefault();
      $(this).toggleClass("starred");
    }
  );

  // Set special squares
  $("#bingo-roguelike-3 tr").on(
    "click",
    "td:not(.popout):not(.hidden):not(.disabled)",
    function () {
      $(this).addClass("disabled");

      if ($(this).hasClass("bluesquare")) {
        $(this).removeClass("bluesquare");
        $(this).addClass("blue");
      } else if ($(this).hasClass("redsquare")) {
        $(this).removeClass("redsquare");
        $(this).addClass("red");
      } else if ($(this).hasClass("yellowsquare")) {
        $(this).removeClass("yellowsquare");
        $(this).addClass("yellow");
      }
      $(this).addClass("greensquare");

      var slot = parseInt($(this).attr("id").slice(4));

      if ($("#slot" + slot).hasClass("row5")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot50").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot50");
      } else if ($("#slot" + slot).hasClass("row8")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot77").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot77");
      } else if ($("#slot" + slot).hasClass("row11")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot104").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot104");
      } else if ($("#slot" + slot).hasClass("row14")) {
        $("#slot" + (slot + SIZE)).attr("id", "slotTemp");
        $("#slot131").attr("id", "slot" + (slot + SIZE));
        $("#slotTemp").attr("id", "slot131");
      }

      // maybe unhide more goals
      // dividable by 5? nothing to the right
      if (slot % SIZE != 0) {
        $("#slot" + (slot + SIZE + 1)).removeClass("hidden");
      }
      // nothing to the left
      if (slot % SIZE != 1) {
        $("#slot" + (slot + SIZE - 1)).removeClass("hidden");
      }
      // top down doesn't matter
      $("#slot" + (slot + SIZE)).removeClass("hidden");

      var row =
        slot % SIZE != 0
          ? Math.floor(slot / SIZE) + 1
          : Math.floor(slot / SIZE);

      $("#row" + row).addClass("currentFloor");
      if (row != 1) {
        $("#row" + (row - 1)).removeClass("currentFloor");
      }

      for (i = 1; i <= 135; i++) {
        if (i != slot && $("#slot" + i).hasClass("row" + row)) {
          $("#slot" + i).addClass("disabled");
          $("#slot" + i).addClass("gray");
        }
      }
    }
  );

  // Set appearance of special squares
  $("#exploration-init-table tr").on("click", "td", function () {
    if ($(this).text() == "S") {
      $(this).text("G").removeClass("bluesquare").addClass("yellowsquare");
    } else if ($(this).text() == "G") {
      $(this).text("").removeClass("yellowsquare");
    } else {
      $(this).text("S").addClass("bluesquare");
    }
  });

  if (MODE == "roguelike" && SIZE == 13) {
    for (i = 1; i <= 260; i++) {
      if (startSlots.includes(i)) {
        $("#slot" + i).addClass("bluesquare");
      } else if (interSlots.includes(i)) {
        $("#slot" + i).addClass("redsquare");
      } else if (goalSlots.includes(i)) {
        $("#slot" + i).addClass("yellowsquare");
      }
    }
  } else if (MODE == "roguelike" && SIZE == 7) {
    for (i = 1; i <= 63; i++) {
      if (startSlots.includes(i)) {
        $("#slot" + i).addClass("bluesquare");
      } else if (interSlots.includes(i)) {
        $("#slot" + i).addClass("redsquare");
      } else if (goalSlots.includes(i)) {
        $("#slot" + i).addClass("yellowsquare");
      }
    }
  } else if (MODE == "roguelike" && SIZE == 9) {
    for (i = 1; i <= 135; i++) {
      if (startSlots.includes(i)) {
        $("#slot" + i).addClass("bluesquare");
      } else if (interSlots.includes(i)) {
        $("#slot" + i).addClass("redsquare");
      } else if (goalSlots.includes(i)) {
        $("#slot" + i).addClass("yellowsquare");
      }
    }
  } else {
    if (SIZE == 4) {
      $("#row5").hide();
      $("#col5").hide();
    } else if (SIZE == 3) {
      $("#row4").hide();
      $("#row5").hide();
      $("#col4").hide();
      $("#col5").hide();
    }
    for (i = 1; i <= 169; i++) {
      if (!slots.includes(i)) {
        $("#slot" + i).hide();
        $("#init-slot" + i).hide();
      }
      if (tlbrSlots.includes(i)) {
        $("#slot" + i).addClass("tlbr");
      }
      if (bltrSlots.includes(i)) {
        $("#slot" + i).addClass("bltr");
      }

      if (MODE == "exploration") {
        if (startSlots.includes(i)) {
          $("#slot" + i).addClass("bluesquare");
        } else if (goalSlots.includes(i)) {
          $("#slot" + i).addClass("yellowsquare");
        }
      }
    }
  }

  $("#row1").hover(
    function () {
      $(".row1").addClass("hover");
    },
    function () {
      $(".row1").removeClass("hover");
    }
  );
  $("#row2").hover(
    function () {
      $(".row2").addClass("hover");
    },
    function () {
      $(".row2").removeClass("hover");
    }
  );
  $("#row3").hover(
    function () {
      $(".row3").addClass("hover");
    },
    function () {
      $(".row3").removeClass("hover");
    }
  );
  $("#row4").hover(
    function () {
      $(".row4").addClass("hover");
    },
    function () {
      $(".row4").removeClass("hover");
    }
  );
  $("#row5").hover(
    function () {
      $(".row5").addClass("hover");
    },
    function () {
      $(".row5").removeClass("hover");
    }
  );
  $("#row6").hover(
    function () {
      $(".row6").addClass("hover");
    },
    function () {
      $(".row6").removeClass("hover");
    }
  );
  $("#row7").hover(
    function () {
      $(".row7").addClass("hover");
    },
    function () {
      $(".row7").removeClass("hover");
    }
  );
  $("#row8").hover(
    function () {
      $(".row8").addClass("hover");
    },
    function () {
      $(".row8").removeClass("hover");
    }
  );
  $("#row9").hover(
    function () {
      $(".row9").addClass("hover");
    },
    function () {
      $(".row9").removeClass("hover");
    }
  );
  $("#row10").hover(
    function () {
      $(".row10").addClass("hover");
    },
    function () {
      $(".row10").removeClass("hover");
    }
  );
  $("#row11").hover(
    function () {
      $(".row11").addClass("hover");
    },
    function () {
      $(".row11").removeClass("hover");
    }
  );
  $("#row12").hover(
    function () {
      $(".row12").addClass("hover");
    },
    function () {
      $(".row12").removeClass("hover");
    }
  );
  $("#row13").hover(
    function () {
      $(".row13").addClass("hover");
    },
    function () {
      $(".row13").removeClass("hover");
    }
  );
  $("#row14").hover(
    function () {
      $(".row14").addClass("hover");
    },
    function () {
      $(".row14").removeClass("hover");
    }
  );
  $("#row15").hover(
    function () {
      $(".row15").addClass("hover");
    },
    function () {
      $(".row15").removeClass("hover");
    }
  );
  $("#row16").hover(
    function () {
      $(".row16").addClass("hover");
    },
    function () {
      $(".row16").removeClass("hover");
    }
  );
  $("#row17").hover(
    function () {
      $(".row17").addClass("hover");
    },
    function () {
      $(".row17").removeClass("hover");
    }
  );
  $("#row18").hover(
    function () {
      $(".row18").addClass("hover");
    },
    function () {
      $(".row18").removeClass("hover");
    }
  );
  $("#row19").hover(
    function () {
      $(".row19").addClass("hover");
    },
    function () {
      $(".row19").removeClass("hover");
    }
  );
  $("#row20").hover(
    function () {
      $(".row20").addClass("hover");
    },
    function () {
      $(".row20").removeClass("hover");
    }
  );

  $("#col1").hover(
    function () {
      $(".col1").addClass("hover");
    },
    function () {
      $(".col1").removeClass("hover");
    }
  );
  $("#col2").hover(
    function () {
      $(".col2").addClass("hover");
    },
    function () {
      $(".col2").removeClass("hover");
    }
  );
  $("#col3").hover(
    function () {
      $(".col3").addClass("hover");
    },
    function () {
      $(".col3").removeClass("hover");
    }
  );
  $("#col4").hover(
    function () {
      $(".col4").addClass("hover");
    },
    function () {
      $(".col4").removeClass("hover");
    }
  );
  $("#col5").hover(
    function () {
      $(".col5").addClass("hover");
    },
    function () {
      $(".col5").removeClass("hover");
    }
  );
  $("#col6").hover(
    function () {
      $(".col6").addClass("hover");
    },
    function () {
      $(".col6").removeClass("hover");
    }
  );
  $("#col7").hover(
    function () {
      $(".col7").addClass("hover");
    },
    function () {
      $(".col7").removeClass("hover");
    }
  );
  $("#col8").hover(
    function () {
      $(".col8").addClass("hover");
    },
    function () {
      $(".col8").removeClass("hover");
    }
  );
  $("#col9").hover(
    function () {
      $(".col9").addClass("hover");
    },
    function () {
      $(".col9").removeClass("hover");
    }
  );
  $("#col10").hover(
    function () {
      $(".col10").addClass("hover");
    },
    function () {
      $(".col10").removeClass("hover");
    }
  );
  $("#col11").hover(
    function () {
      $(".col11").addClass("hover");
    },
    function () {
      $(".col11").removeClass("hover");
    }
  );
  $("#col12").hover(
    function () {
      $(".col12").addClass("hover");
    },
    function () {
      $(".col12").removeClass("hover");
    }
  );
  $("#col13").hover(
    function () {
      $(".col13").addClass("hover");
    },
    function () {
      $(".col13").removeClass("hover");
    }
  );
  $("#col14").hover(
    function () {
      $(".col14").addClass("hover");
    },
    function () {
      $(".col14").removeClass("hover");
    }
  );
  $("#col15").hover(
    function () {
      $(".col15").addClass("hover");
    },
    function () {
      $(".col15").removeClass("hover");
    }
  );
  $("#col16").hover(
    function () {
      $(".col16").addClass("hover");
    },
    function () {
      $(".col16").removeClass("hover");
    }
  );
  $("#col17").hover(
    function () {
      $(".col17").addClass("hover");
    },
    function () {
      $(".col17").removeClass("hover");
    }
  );
  $("#col18").hover(
    function () {
      $(".col18").addClass("hover");
    },
    function () {
      $(".col18").removeClass("hover");
    }
  );
  $("#col19").hover(
    function () {
      $(".col19").addClass("hover");
    },
    function () {
      $(".col19").removeClass("hover");
    }
  );
  $("#col20").hover(
    function () {
      $(".col20").addClass("hover");
    },
    function () {
      $(".col20").removeClass("hover");
    }
  );

  $("#tlbr").hover(
    function () {
      $(".tlbr").addClass("hover");
    },
    function () {
      $(".tlbr").removeClass("hover");
    }
  );
  $("#bltr").hover(
    function () {
      $(".bltr").addClass("hover");
    },
    function () {
      $(".bltr").removeClass("hover");
    }
  );

  var resType = "";
  if (TYPE == "short") {
    resType = "json_event";
  } else {
    resType = "json";
  }

  // var request = new XMLHttpRequest();
  // // request.open("GET", "/goals.txt" + resType + "?seed=" + SEED + "&size=" + SIZE, true);
  // request.open("GET", "./kh_goals.txt", true);
  // request.responseType = "text";
  // request.onload = function () {
  console.log(cardtype);
  //var bingoBoard = JSON.parse(normal_goals);

  var bingoBoard = masterGoalList;
  // if(cardtype != "Normal") {
  // 	var bingoBoard = long_goals;
  // }

  // Get goal list for selected pool
  switch (cardtype) {
    // case "Long":
    // 	var bingoBoard = long_goals;
    // 	console.log(bingoBoard)
    // 	break;
    // case "Short":
    // 	var bingoBoard = short_goals;
    // 	console.log(bingoBoard)
    // 	break;
    case "Boss-Rando":
      var bingoBoard = bossRandoList;
      break;
    case "KH1":
      var bingoBoard = kh1goals;
      break;
    case "KH1 Easy":
      var bingoBoard = kh1Easy;
      break;
    case "KH1 Normal":
      var bingoBoard = kh1Medium;
      break;
    case "KH1 Hard":
      var bingoBoard = kh1Hard;
      break;
    case "KH1 Nightmare":
      var bingoBoard = kh1Nightmare;
      break;
    case "KH1 Image":
      var bingoBoard = kh1ImageList;
      break;
    case "Bunter":
      var bingoBoard = bunterList;
      break;
    case "Bunter Image":
      var bingoBoard = bunterImageList;
      break;
    case "Combo":
      var bingoBoard = comboList;
      break;
    case "Custom":
      var bingoBoard = customList;
      break;
    case "BBS Terra":
      var bingoBoard = terra;
      break;
    case "BBS Aqua":
      var bingoBoard = aqua;
      break;
    case "BBS Ven":
      var bingoBoard = ventus;
      break;
    case "KH3":
      var bingoBoard = kh3goals;
      break;
    case "KH2 Generic":
      var bingoBoard = kh2Generic;
      break;
    case "BBS Combo":
      var bingoBoard = bbsCombo;
      break;
    default:
      var bingoBoard = masterGoalList;
  }

  //console.log(bingoBoard.length);
  //console.log(SIZE);

  if (bingoBoard.length < sizeRequirements[SIZE]) {
    alert(
      "Not enough goals to meet the size requirements for selected settings."
    );
  }

  bingoBoard = shuffleArray(bingoBoard);

  // Populate board
  if (MODE == "roguelike" && SIZE == 7) {
    var j = 1;
    for (i = 1; i <= 63; i++) {
      if (startSlots.includes(i)) {
        $("#slot" + i).append("START");
      } else if (!$("#slot" + i).hasClass("v-hidden")) {
        // check if images are being used for goals
        if (imageGoals) {
          var imgSrc = bingoBoard[j - 1].image;
          $("#slot" + i).append(
            '<div class="tooltip"><img src="' +
              imgSrc +
              '" alt="' +
              bingoBoard[j - 1].name +
              '" class="bingo-image"><span class="tooltiptext">' +
              bingoBoard[j - 1].name +
              "</span></div>"
          );
          j++;
        } else {
          // else use text
          $("#slot" + i).append(bingoBoard[j - 1].name);
          j++;
        }
        // if (EXPLORATION == "1" && !startSlots.includes(i)) {
        if (!startSlots.includes(i)) {
          $("#slot" + i).addClass("hidden");
        }
        //$('#slot'+i).append("<br/>" + bingoBoard[i].types.toString());
        //$('#slot'+i).append("<br/>" + bingoBoard[i].synergy);
      }
    }
  } else if (MODE == "roguelike" && SIZE == 13) {
    //populate the actual table on the page
    var j = 1;
    for (i = 1; i <= 260; i++) {
      if (startSlots.includes(i)) {
        $("#slot" + i).append("START");
      } else if (!$("#slot" + i).hasClass("v-hidden")) {
        // $("#slot" + i).append(bingoBoard[j - 1].name);
        // j++;
        if (imageGoals) {
          var imgSrc = bingoBoard[j - 1].image;
          $("#slot" + i).append(
            '<div class="tooltip"><img src="' +
              imgSrc +
              '" alt="' +
              bingoBoard[j - 1].name +
              '" class="bingo-image"><span class="tooltiptext">' +
              bingoBoard[j - 1].name +
              "</span></div>"
          );
          j++;
        } else {
          // else use text
          $("#slot" + i).append(bingoBoard[j - 1].name);
          j++;
        }
        // if (EXPLORATION == "1" && !startSlots.includes(i)) {
        if (!startSlots.includes(i)) {
          $("#slot" + i).addClass("hidden");
        }
        //$('#slot'+i).append("<br/>" + bingoBoard[i].types.toString());
        //$('#slot'+i).append("<br/>" + bingoBoard[i].synergy);
      }
    }
  } else if (MODE == "roguelike" && SIZE == 9) {
    //populate the actual table on the page
    var j = 1;
    for (i = 1; i <= 135; i++) {
      if (startSlots.includes(i)) {
        $("#slot" + i).append("START");
      } else if (!$("#slot" + i).hasClass("v-hidden")) {
        // $("#slot" + i).append(bingoBoard[j - 1].name);
        // j++;
        if (imageGoals) {
          var imgSrc = bingoBoard[j - 1].image;
          $("#slot" + i).append(
            '<div class="tooltip"><img src="' +
              imgSrc +
              '" alt="' +
              bingoBoard[j - 1].name +
              '" class="bingo-image"><span class="tooltiptext">' +
              bingoBoard[j - 1].name +
              "</span></div>"
          );
          j++;
        } else {
          // else use text
          $("#slot" + i).append(bingoBoard[j - 1].name);
          j++;
        }
        // if (EXPLORATION == "1" && !startSlots.includes(i)) {
        if (!startSlots.includes(i)) {
          $("#slot" + i).addClass("hidden");
        }
        //$('#slot'+i).append("<br/>" + bingoBoard[i].types.toString());
        //$('#slot'+i).append("<br/>" + bingoBoard[i].synergy);
      }
    }
  } else {
    //populate the actual table on the page
    var j = SIZE == 13 ? 169 : 25;
    for (i = 1; i <= j; i++) {
      // check if images are being used for goals
      if (imageGoals) {
        var imgSrc = bingoBoard[i - 1].image;
        $("#slot" + i).append(
          '<div class="tooltip"><img src="' +
            imgSrc +
            '" alt="' +
            bingoBoard[i - 1].name +
            '" class="bingo-image"><span class="tooltiptext">' +
            bingoBoard[i - 1].name +
            "</span></div>"
        );
      } else {
        // else use text
        $("#slot" + i).append(bingoBoard[i - 1].name);
      }
      if (MODE == "exploration" && !startSlots.includes(i)) {
        $("#slot" + i).addClass("hidden");
      }
      //$('#slot'+i).append("<br/>" + bingoBoard[i].types.toString());
      //$('#slot'+i).append("<br/>" + bingoBoard[i].synergy);
    }
  }

  // Make bingosync JSON
  console.log(SIZE);
  switch (SIZE) {
    case 5:
      var bingosync_goals = JSON.stringify(
        bingoBoard.slice(0, 25).map((item) => ({ name: item.name }))
      );
      break;
    case 4:
      // bingoBoard.splice(4, 1);
      // bingoBoard.splice(8, 1);
      // bingoBoard.splice(12, 1);
      // bingoBoard.splice(16, 1);
      // var bingosync_goals = JSON.stringify(bingoBoard.slice(0, 16));
      $("#jsonFormat").hide();
      break;
    case 3:
      // bingoBoard.splice(3, 2);
      // bingoBoard.splice(6, 2);
      // bingoBoard.splice(9, 2);
      // var bingosync_goals = JSON.stringify(bingoBoard.slice(0, 9));
      $("#jsonFormat").hide();
      break;
    default:
      var bingosync_goals = JSON.stringify(
        bingoBoard.slice(0, 25).map((item) => ({ name: item.name }))
      );
  }

  //var bingosync_goals = JSON.stringify(bingoBoard.slice(0,25));
  if (MODE == "roguelike") {
    $("#bingosync-goals").text("Hidden for Roguelike Mode");
    $("#bingosync-goals-hidden").text(bingosync_goals);
  } else if (MODE == "exploration") {
    $("#bingosync-goals").text("Hidden for Exploration Mode");
    $("#bingosync-goals-hidden").text(bingosync_goals);
  } else {
    // populate the bingosync-goals
    // useful to use a test board for bingosync
    $("#bingosync-goals").text(bingosync_goals);
    $("#bingosync-goals-hidden").text(bingosync_goals);
  }

  if (LANG == "en") {
    translateToEN();
  }

  $(".loader").remove();
  $("#results").removeClass("mask");
  // };
  // request.send();

  return true;
}; // setup

// Set variables for selected card type and bingo mode
function reseedPage(type) {
  var MAX_SEED = 999999999; //1 million cards
  var qSeed = "";
  var qCustom = $("#custom-seed").is(":checked") ? "&custom=1" : "";
  var qType = "&type=" + type;
  var qMode = $("#exploration").is(":checked")
    ? "&mode=exploration"
    : $("#roguelike").is(":checked")
    ? "&mode=roguelike"
    : "";
  var qSize = "";
  var qStart = "";
  var qGoal = "";
  var qLang = "";

  if ($("#random-seed").is(":checked")) {
    qSeed =
      "?seed=" + Math.floor((Date.now() + Math.random() * 1000000) % MAX_SEED);
  } else {
    var s = $("#seed").val();
    qSeed =
      !isNaN(s) && parseInt(s) >= 0 && parseInt(s) <= MAX_SEED
        ? "?seed=" + s
        : "?seed=" + Math.ceil(MAX_SEED * Math.random());
  }

  if (qMode == "&mode=roguelike") {
    // qSize = "";
    qSize = $("#size9").is(":checked")
      ? "&size=9"
      : $("#size15").is(":checked")
      ? "&size=15"
      : $("#size20").is(":checked")
      ? "&size=20"
      : "";
  } else {
    qSize = $("#size3").is(":checked")
      ? "&size=3"
      : $("#size4").is(":checked")
      ? "&size=4"
      : $("#size13").is(":checked")
      ? "&size=13"
      : "";
  }

  if (qMode == "&mode=exploration") {
    if (qSize == "&size=13") {
      var start = $("#exploration-init-form-start").val();
      var goal = $("#exploration-init-form-goal").val();

      if (start.length) {
        qStart = "&start=" + start;
      } else {
        qStart = "&start=0";
      }
      if (goal.length) {
        qGoal = "&goal=" + goal;
      } else {
        qGoal = "&goal=0";
      }
    } else {
      var startSlots = [];
      var goalSlots = [];
      for (i = 1; i <= 25; i++) {
        if ($("#init-slot" + i).text() == "S") {
          startSlots.push(i);
        } else if ($("#init-slot" + i).text() == "G") {
          goalSlots.push(i);
        }
      }
      if (startSlots.length) {
        qStart = "&start=" + startSlots.join("-");
      } else {
        qStart = "&start=0";
      }
      if (goalSlots.length) {
        qGoal = "&goal=" + goalSlots.join("-");
      } else {
        qGoal = "&goal=0";
      }
    }
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("lang") != null) {
    qLang = "&lang=" + params.get("lang");
  }

  window.open(
    "bingo.html" +
      qSeed +
      qCustom +
      qType +
      qMode +
      qSize +
      qStart +
      qGoal +
      qLang,
    "_blank"
  );

  return false;
}

function changeSeedRadio(isCustom) {
  if (isCustom == "1") {
    $("#seed").prop("disabled", false);
  } else {
    $("#seed").prop("disabled", true);
  }
}

function changeGame(selectedGame) {
  const objectivesSelect = document.getElementById("type");
  const customUpload = document.getElementById("customUpload");

  // Game categories
  const gameOptions = {
    kingdomhearts2: {
      options: `
        <option value="kh2" selected="selected">Default</option>
        <option value="kh2generic">Generic</option>
        <option value="bunter">Boss Hunter</option>
        <option value="bunterImage">Boss Hunter (Images)</option>
      `,
      customUpload: "",
    },
    kingdomhearts1: {
      options: `
        <option value="kh1E">Easy</option>
        <option value="kh1M" selected="selected">Normal</option>
        <option value="kh1H">Hard</option>
        <option value="kh1N">Nightmare</option>
        <option value="kh1Image">AP Randomizer (Images)</option>
      `,
      customUpload: "",
    },
    kingdomhearts3: {
      options: `
        <option value="kh3" selected="selected">Default</option>
      `,
      customUpload: "",
    },
    birthbysleep: {
      options: `
        <option value="terra" selected="selected">Terra</option>
        <option value="ven">Ventus</option>
        <option value="aqua">Aqua</option>
      `,
      customUpload: "",
    },
    combogames: {
      options: `
        <option value="combo" selected="selected">KH 1 + 2</option>
        <option value="bbscombo">BBS All Stories</option>
      `,
      customUpload: "",
    },
    userCustom: {
      options: `
        <option value="custom" selected="selected">Upload a file</option>
      `,
      customUpload:
        '<input id="fileInput" type="file" name="custom-file" accept=".json">',
    },
    "": {
      options: `
        <option value="" selected="selected"></option>
      `,
      customUpload: "",
    },
  };

  // Set objectives and custom upload status
  const selectedOptions = gameOptions[selectedGame] || gameOptions[""];
  objectivesSelect.innerHTML = selectedOptions.options;
  customUpload.innerHTML = selectedOptions.customUpload;

  // Handle file select if custom if selected
  if (selectedGame === "userCustom") {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.addEventListener("change", handleFileSelect);
    }
  }
}

function changeModeRadio() {
  if ($("#roguelike").is(":checked")) {
    //$("#size5").prop("checked", true);
    $("#size15").prop("checked", true);
    $("#size-radio").hide();
    $("#size-radio2").show();
    $("#exploration-init").hide();
  } else if ($("#exploration").is(":checked")) {
    $("#size-radio").show();
    $("#size-radio2").hide();
    $("#exploration-init").show();

    var size = parseInt($('input[name="size-radio"]:checked').val());
    changeSizeRadio(size);
  } else {
    $("#size-radio").show();
    $("#size-radio2").hide();
    $("#exploration-init").hide();
  }
}

function changeSizeRadio(size) {
  var slots = [];
  var defaultStartSlots = [];
  var defaultGoalSlots = [];

  if (size == 3) {
    slots = [1, 2, 3, 6, 7, 8, 11, 12, 13];
    defaultStartSlots = [1, 13];
  } else if (size == 4) {
    slots = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19];
    defaultStartSlots = [7, 13];
  } else {
    slots = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25,
    ];
    defaultStartSlots = [7, 19];
  }

  if (size == 13) {
    $("#exploration-init-table").hide();
    $("#exploration-init-form").show();
    $("#exploration-init-form-start").val("85");
    $("#exploration-init-form-goal").val("1-13-157-169");
  } else {
    if ($("#exploration").is(":checked")) {
      $("#exploration-init-table").show();
      $("#exploration-init-form").hide();
    }
    for (i = 1; i <= 25; i++) {
      if (slots.includes(i)) {
        $("#init-slot" + i).show();
      } else {
        $("#init-slot" + i).hide();
      }

      if (defaultStartSlots.includes(i)) {
        $("#init-slot" + i)
          .text("S")
          .removeClass("yellowsquare")
          .addClass("bluesquare");
      } else if (defaultGoalSlots.includes(i)) {
        $("#init-slot" + i)
          .text("G")
          .removeClass("bluesquare")
          .addClass("yellowsquare");
      } else {
        $("#init-slot" + i)
          .text("")
          .removeClass("bluesquare")
          .removeClass("yellowsquare");
      }
    }
  }
}

function copyJson() {
  var json = $("#bingosync-goals-hidden").text();

  navigator.clipboard.writeText(json).then(() => {
    $("#copyJsonButton").text("✓");
    $("#copyJsonButton").css("pointer-events", "none");
    $("#copyJsonButton").css("cursor", "default");
    setTimeout(function () {
      $("#copyJsonButton").text("Copy JSON");
      $("#copyJsonButton").css("pointer-events", "");
      $("#copyJsonButton").css("cursor", "pointer");
    }, 1500);
  });
}

// Backwards Compatability
var srl = { bingo: bingo };

// Initialize page
$(function () {
  srl.bingo(5);
});

//from w3docs
function shuffleArray(arr) {
  // Start from the last element and swap
  // one by one. We don't need to run for
  // the first element that's why i > 0
  for (let i = arr.length - 1; i > 0; i--) {
    // pick a random index from 0 to i inclusive
    const j = Math.floor(Math.random() * (i + 1)); // at random index
    // Swap arr[i] with the element
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
