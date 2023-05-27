var model = {
    currentAvenger: null,
    adminView: false,
    data: [
        {
            id: 1,
            name: "Spiderman",
            url: "./assets/images/square_thumb@3x.jpg",
            count: 0
        },
        {
            id: 2,
            name: "Iron Man",
            url: "./assets/images/sq35017__3_.jpg",
            count: 0
        },
        {
            id: 3,
            name: "Hulk",
            url: "./assets/images/marvels-avengers-square-enix-4-900x900.jpg",
            count: 0
        },
        {
            id: 4,
            name: "Captain America",
            url: "./assets/images/2923621-1.jpg",
            count: 0
        },
        {
            id: 5,
            name: "Thor",
            url: "./assets/images/thor-life-size-standee__square.jpg",
            count: 0
        }
    ],
    getCurrentAvenger: function () {
        return this.currentAvenger
    },
    setCurrentAvenger: function (avenger) {
        this.currentAvenger = avenger
    },
    getAllAvengers: function () {
        return this.data
    },
    toggleAdminView: function () {
        this.adminView = !this.adminView
    }
}


var controller = {
    init: function () {
        selectedAvengerView.init()
        avengersListView.init()
    },
    getAllAvengers: function () {
        return model.getAllAvengers()
    },
    getCurrentAvenger: function () {
        return model.getCurrentAvenger()
    },
    getAdminViewState: function () {
        return model.adminView
    },
    setCurrentAvenger: function (avenger) {
        model.setCurrentAvenger(avenger)
    },
    increment: function () {
        var avenger = this.getCurrentAvenger()
        avenger.count++
        this.refreshSelectedView()
    },
    updateCurrentAvenger(newName, newUrl, newCount) {
        controller.getCurrentAvenger().name = newName
        controller.getCurrentAvenger().url = newUrl
        controller.getCurrentAvenger().count = newCount
    },
    refreshSelectedView: function () {
        selectedAvengerView.render()
    },
    refreshListView: function () {
        avengersListView.render()
    },
    toggleAdminView: function () {
        model.toggleAdminView()
    }
}


var selectedAvengerView = {
    init: function () {
        var currAvenger = controller.getCurrentAvenger()
        if (currAvenger == null) {
            currAvenger = controller.setCurrentAvenger(controller.getAllAvengers()[0])
        }
        $(".avenger-image").on('click', function () {
            controller.increment()
        })
        this.render()
    },
    render: function () {
        var currAvenger = controller.getCurrentAvenger()
        $(".avenger-image").attr("src", currAvenger.url)
        $(".avenger-name").text(currAvenger.name)
        $(".avenger-count").text("Counter: " + currAvenger.count)
    }
}


var avengersListView = {
    init: function () {
        if (!controller.getAdminViewState()) {
            $(".admin-section").toggle("d-none");
        }

        this.showAdminInputsSetup()
        this.saveAdminChangesSetup()

        this.render()
    },
    showAdminInputsSetup: function () {
        $(".admin").on('click', function () {
            controller.toggleAdminView()
            $(".admin-section").toggle("d-none");
        }).css("cursor", "pointer")
    },
    saveAdminChangesSetup: function () {
        $(".save-btn").on('click', function () {
            var newName = $(".name-input").val()
            if (newName == "") {
                newName = controller.getCurrentAvenger().name
            }
            var newUrl = $(".url-input").val()
            if (newUrl == "") {
                newUrl = controller.getCurrentAvenger().url
            }
            var newCount = $(".count-input").val()
            if (newCount == "") {
                newCount = controller.getCurrentAvenger().count
            }
            var id = controller.getCurrentAvenger().id
            $("#" + id).text(newName)
            controller.updateCurrentAvenger(newName, newUrl, newCount)
            controller.toggleAdminView()
            $(".admin-section").toggle("d-none");
            controller.refreshSelectedView()
            $(".name-input").val("")
            $(".url-input").val("")
            $(".count-input").val("")
        })
    },
    render: function () {
        var avengers = controller.getAllAvengers()

        for (let i = 0; i < avengers.length; i++) {
            var listItem = $("<li class='mt-3' id='" + avengers[i].id + "'></li>").css("cursor", "pointer")
            var avengerName = $("<h1 class='text-center'>" + avengers[i].name + "</h1>")
            var image = $("<img class='img-fluid rounded-4' src='" + avengers[i].url + "'>")

            listItem.on('click', function () {
                controller.setCurrentAvenger(avengers[i])
                controller.refreshSelectedView()
            })

            $(".avengersList").append((listItem).append(image, avengerName))
        }
    }
}

$(document).ready(function () {
    controller.init()
});