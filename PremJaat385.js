(function () {
    // Function to get AngularJS scope by element class or ID
    function getScope(elementClass) {
        var el = document.querySelector(elementClass);
        if (el) {
            var scope = angular.element(el).scope();
            return scope;
        }
        return null;
    }

    // Function to get the data from AngularJS scope
    function getCurrentExamsQuiz() {
        var scope = getScope('.ng-scope'); // Use a class that is commonly applied by AngularJS
        if (scope) {
            var currentExamsQuiz = scope.CurrentExamsQuiz;
            // AttemptLink FeedbackLink 
            // Process the data to open AttemptLink
            currentExamsQuiz.forEach(exam => {
                if (exam.AttemptLink != "") {
                    let fullAttemptLink = `http://glauniversity.in:8092/student/${exam.AttemptLink}`;
                    // window.open(fullAttemptLink, '_blank');
                    openPopUp(fullAttemptLink, 0, 0, 2);
                }
            });

        } else {
            console.log('Scope not found');
        }
    }

    var topbarElement = document.querySelector('.topbar.back-warning');
    if (topbarElement) {
        topbarElement.addEventListener('click', function () {
            getCurrentExamsQuiz();
        });
    } else {
        console.log('Topbar element not found');
    }

    // Add Custom CSS - Function
    const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css
    const script = document.createElement('script');

    function createHeader() {
        const headerContainer = document.getElementById('header-container');

        // Create header div
        const header = document.createElement('div');
        header.className = 'header';

        // Create logo image
        const logo = document.createElement('img');
        logo.src = 'https://i.postimg.cc/Cx9Rrz3z/GLA-Icon.png';
        logo.alt = 'GLA University Logo';
        header.appendChild(logo);

        // Create header title div
        const headerTitle = document.createElement('div');
        headerTitle.className = 'header-title';
        headerTitle.innerText = 'GLA University - Online Examination System';
        header.appendChild(headerTitle);

        // Create header icons div
        const headerIcons = document.createElement('div');
        headerIcons.className = 'header-icons';

        // Create minimize icon
        const minimizeIcon = document.createElement('img');
        minimizeIcon.src = 'https://i.postimg.cc/Wb4zJvZ4/Navigation.png';
        minimizeIcon.alt = 'Minimize';
        headerIcons.appendChild(minimizeIcon);

        header.appendChild(headerIcons);

        // Append the header to the container
        document.body.appendChild(header);
    }

    function setupBottomBar() {

        // Create elements
        var bottomDiv = document.createElement('div');
        bottomDiv.className = 'bottom-div';

        var imgGLAIcon = document.createElement('img');
        imgGLAIcon.src = 'https://i.postimg.cc/Cx9Rrz3z/GLA-Icon.png';
        imgGLAIcon.alt = 'GLA Icon';

        var rightDiv = document.createElement('div');
        rightDiv.className = 'right-div';

        var imgBatteryIcon = document.createElement('img');
        imgBatteryIcon.src = 'https://i.postimg.cc/PfKkr0r4/battery-icon.png';
        imgBatteryIcon.alt = 'Battery Icon';

        var imgWifiIcon = document.createElement('img');
        imgWifiIcon.src = 'https://i.postimg.cc/K8BLtPW0/wifi-icon.png';
        imgWifiIcon.alt = 'Wifi Icon';

        var imgEngIcon = document.createElement('img');
        imgEngIcon.src = 'https://i.postimg.cc/9fcpMgfd/eng-icon.png';
        imgEngIcon.alt = 'ENG Icon';

        var pDateTime = document.createElement('p');
        pDateTime.id = 'datetime';

        var imgPowerIcon = document.createElement('img');
        imgPowerIcon.src = 'https://i.postimg.cc/50YfF370/power-icon.png';
        imgPowerIcon.alt = 'Power Icon';
        imgPowerIcon.style.paddingRight = '10px';

        // Append elements
        rightDiv.appendChild(imgBatteryIcon);
        rightDiv.appendChild(imgWifiIcon);
        rightDiv.appendChild(imgEngIcon);
        rightDiv.appendChild(pDateTime);
        rightDiv.appendChild(imgPowerIcon);

        bottomDiv.appendChild(imgGLAIcon);
        bottomDiv.appendChild(rightDiv);

        // Append bottomDiv to body or any desired parent element
        document.body.appendChild(bottomDiv);

        // Function to update date and time
        function updateDateTime() {
            var dt = new Date();
            var hours = dt.getHours().toString().padStart(2, '0');
            var minutes = dt.getMinutes().toString().padStart(2, '0');
            var timeFormat = hours >= 12 ? 'PM' : 'AM';
            var formattedTime = (hours % 12 || 12) + ':' + minutes + ' ' + timeFormat;
            var formattedDate = (dt.getMonth() + 1).toString().padStart(2, '0') + '/' + dt.getDate().toString().padStart(2, '0') + '/' + dt.getFullYear();

            pDateTime.innerHTML = '<span style="font-weight: 600;">' + formattedTime + '</span><br>' + formattedDate;
        }

        // Update time immediately on setup
        updateDateTime();

        // Update time every minute
        setInterval(updateDateTime, 60000); // Update every 60 seconds
    }

    createHeader();
    setupBottomBar();
    document.body.style.paddingBottom = 40 + 'px';
    document.body.style.paddingTop = 30 + 'px';
    Add_Custom_Style(`

        body {
            overflow: hidden !important;
        }

        .header {
            color: #707070 !important;
            display: flex;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            padding-left:6px;
            background-color: #DADADA;
            border-bottom: 1px solid #ccc;
        }

        .header img {
            height: 20px;
        }

        .header-title {
            flex-grow: 1;
            margin-left: 10px;
            font-size: 12px;
        }

        .header-icons {
            display: flex;
            align-items: center;
        }

        .header-icons img {
            height: 30px;
            margin-left: 10px;
            cursor: pointer;
        }


        .bottom-div {
            font-family: arial, sans-serif;
            color: #707070 !important;
            background-color: #00b7ff;
            padding: 0;
            position: fixed;
            z-index: 9999;
            left: 0;
            bottom: 0;
            height: 40px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center; /* Center items vertically */
        }

        .bottom-div img {
            height: 35px;
            padding-left: 16px;
            padding-top: 2px;
        }

        .right-div {
            padding: 0px;
            border-radius: 0px;
            margin-left: auto; /* Pushes .right-div to the right */
        }

        .right-div img {
            height: 30px;
            width: auto;
            padding-top: 5px;
            position: relative;
            top: -6px;
        }

        .right-div p {
            font-size: 15px;
            display: inline-block;
            padding-left: 10px;
            padding-right: 10px;
            text-align: center;
            position: relative;
            top: 8px;
            line-height: 18px;
        }
    `);
    
    for (let i = 1; i <= 60; i++) {
        let questionId = "Q_" + i;
        let divElement = document.getElementById(questionId);
        if (divElement) {
            divElement.setAttribute("onclick", "return ChangeQues('" + i + "');");
        }
    }

    // Select all <a> tags with id="prev_1" from 1 to 60
    for (let i = 1; i <= 60; i++) {
        if (i != 1) {
            let prevLink = document.getElementById(`prev_${i}`);
            if (prevLink) {
                prevLink.removeAttribute('style');
                prevLink.setAttribute("onclick", "return ChangeQues('" + (i - 1) + "');");
            }
        }
        if (i != 60) {
            let nextLink = document.getElementById(`next_${i}`);
            if (nextLink) {
                nextLink.removeAttribute('onclick');
                nextLink.setAttribute("onclick", "return ChangeQues('" + (i + 1) + "');");
            }
        }
    }

    // Find all elements with class 'mainbuttons'
    var mainButtons = document.querySelectorAll('.mainbuttons');

    // Loop through each '.mainbuttons' element
    mainButtons.forEach(function (mainButton) {
        // Find all <b> elements inside the current '.mainbuttons' element
        var boldElements = mainButton.querySelectorAll('div b');

        // Loop through each <b> element found
        boldElements.forEach(function (boldElement) {
            // Add a click event listener to each <b> element
            boldElement.addEventListener('click', function () {
                // Find the parent div with id starting with "quespanel_"
                var parentDiv = this.closest('div[id^="quespanel_"]');

                if (!parentDiv) {
                    console.error('Parent div with id starting with "quespanel_" not found.');
                    return;
                }

                // Find the sub div with class "mainquestion" inside the parent div
                var mainQuestionDiv = parentDiv.querySelector('.mainquestion');

                if (!mainQuestionDiv) {
                    console.error('Sub div with class "mainquestion" not found inside the parent div.');
                    return;
                }

                // Extract the visible text content from the mainquestion div
                var questionText = mainQuestionDiv.textContent.trim();

                // Copy text to clipboard using Clipboard API
                navigator.clipboard.writeText(questionText)
                    .then(function () {
                        console.log('Text copied to clipboard:', questionText);
                        // Change text color to red temporarily
                        boldElement.style.color = 'red';
                        setTimeout(function () {
                            boldElement.style.color = 'black';
                        }, 1000); // 1000 milliseconds = 1 second
                    })
                    .catch(function (err) {
                        console.error('Failed to copy text to clipboard:', err);
                    });
            });
        });
    });



})();
