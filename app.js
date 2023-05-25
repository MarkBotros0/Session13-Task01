var model = {
    currentAvenger: null,
    adminView: false,
    data: [
        {
            id: 1,
            name: "Spiderman",
            url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            count: 0
        },
        {
            id: 2,
            name: "Dead Pool",
            url: "https://images.unsplash.com/photo-1608889175157-718b6205a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
            count: 0
        },
        {
            id: 3,
            name: "Hulk",
            url: "https://insidethemagic.net/wp-content/uploads/2019/04/resizer.php_-800x400.jpeg",
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
        if (controller.getAdminViewState) {
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
            var newUrl = $(".url-input").val()
            var newCount = $(".count-input").val()
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
        var avengersList = $(".avengersList")

        for (let i = 0; i < avengers.length; i++) {
            var listItem = $("<li id='" + avengers[i].id + "'></li>").text(avengers[i].name).css("cursor", "pointer")

            listItem.on('click', function () {
                controller.setCurrentAvenger(avengers[i])
                controller.refreshSelectedView()
            })
            $(avengersList).append(listItem);
        }
    }
}

$(document).ready(function () {
    controller.init()
});