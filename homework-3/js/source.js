$(function () {

    let revenueAmt = "$48,250";
    let customerNum = "1,284";
    let ordersAmt = "342";
    let issuesAmt = "12";
    let username = "UTRGV Vaqueros";
    let notifAmt = 3;

    const customers = [
        {
            "name": "Alice Johnson",
            "email": "alice@example.com",
            "status": "Active",
            "joined": "09/10/2026"
        },
        {
            "name": "Robert Smith",
            "email": "robert@example.com",
            "status": "Pending",
            "joined": "09/12/2026"
        },
        {
            "name": "Maria Garcia",
            "email": "maria@example.com",
            "status": "Active",
            "joined": "09/15/2026"
        }
    ];

    const sales = [
        {
            "product": "Product A",
            "quantity": "124",
            "revenue": "$12,400"
        },
        {
            "product": "Product B",
            "quantity": "98",
            "revenue": "$9,800"
        },
        {
            "product": "Product C",
            "quantity": "75",
            "revenue": "$7,500"
        },
    ];

    const activities = [
        {
            "message" : "New customer registered"
        },
        {
            "message" : "Order #10482 completed"
        },
        {
            "message" : "Payment received"
        },
        {
            "message" : "Support ticket created"
        }
    ];

    const messages = [
        {
            "messsage" : "All systems operational"
        },
        {
            "messsage" : "All settings loaded for this system"
        }
    ];

    const notifications = [
        {
            "messsage": "A new shipment is expected to arrive on Sep 30, 2026"
        },
        {
            "messsage": "There are 12 outstanding issues with last week's orders"
        },
        {
            "messsage": "Three new customers joined our platform in the last month"
        },
    ];

    const tasks = [
       {
            "messsage": "Review orders"
        },
        {
            "messsage": "Contact customer"
        },
        {
            "messsage": "Generate report"
        },
    ]


    // *********************************************************************
    // Do not modify the JS objects above. You will write your code below.
    // *********************************************************************


    // ---------------------------------------------------------------------
    // PART 1: Insert content dynamically from the JS variables/objects
    // ---------------------------------------------------------------------

    // a. Username
    $("#username").text(username);

    // b. Revenue in the stat card + f. revenue in the Overview tab
    //    (both elements share the class "revenue-amt")
    $(".revenue-amt").text(revenueAmt);

    // c. Number of customers
    $("#customer-num").text(customerNum);

    // d. Number of orders
    $("#orders-amt").text(ordersAmt);

    // e. Number of issues
    $("#issues-amt").text(issuesAmt);

    // g. Sales summary table rows
    function buildSalesRows() {
        const $body = $("#salesTableBody");
        $body.empty();
        $.each(sales, function (i, item) {
            const $row = $("<tr></tr>");
            $row.append($("<td></td>").text(item.product));
            $row.append($("<td></td>").text(item.quantity));
            $row.append($("<td></td>").text(item.revenue));
            $body.append($row);
        });
    }

    // h. Recent activity list items
    function buildActivityList() {
        const $list = $("#activity-list");
        $list.empty();
        $.each(activities, function (i, item) {
            $list.append($("<li></li>").text(item.message));
        });
    }

    // i. Recent customers table rows
    function buildCustomerRows() {
        const $body = $("#customerTableBody");
        $body.empty();
        $.each(customers, function (i, customer) {
            const $row = $("<tr></tr>");
            $row.append($("<td></td>").text(customer.name));
            $row.append($("<td></td>").text(customer.email));

            // Status badge: class is "status status-active" or "status status-pending"
            const $badge = $("<span></span>")
                .addClass("status status-" + customer.status.toLowerCase())
                .text(customer.status);
            $row.append($("<td></td>").append($badge));

            $row.append($("<td></td>").text(customer.joined));
            $body.append($row);
        });
    }

    // Generic helper for the simple lists that use the "messsage" key
    // (j. system status, k. notifications, m. tasks)
    function buildMessageList(selector, items) {
        const $list = $(selector);
        $list.empty();
        $.each(items, function (i, item) {
            $list.append($("<li></li>").text(item.messsage));
        });
    }

    // l. Number of notifications in "You have N new notifications."
    $("#notification-num").text(notifAmt);

    buildSalesRows();
    buildActivityList();
    buildCustomerRows();
    buildMessageList("#system-status-list", messages);
    buildMessageList("#notifications-list", notifications);
    buildMessageList("#tasks-list", tasks);


    // ---------------------------------------------------------------------
    // PART 2: jQuery UI widgets
    // ---------------------------------------------------------------------

    // a. All HTML buttons -> jQuery UI Button widgets
    //    (Dashboard, Customers, Reports are intentionally not functional)
    $("button").button();

    // b. Tabs
    $("#dashboardTabs").tabs();

    // c. Dialog
    $("#customerDialog").dialog({
        autoOpen: false,
        modal: true,
        width: 450,
        buttons: {
            "Create Customer": function () {
                var name = $("#customerName").val();
                var email = $("#customerEmail").val();

                if (!name || !email) {
                    alert("Please enter a name and email.");
                    return;
                }

                alert("Customer created: " + name);
                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    // d. Accordion
    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    // e. "+ New Customer" button opens the dialog
    $("#newCustomerButton").on("click", function () {
        $("#customerDialog").dialog("open");
    });

    // f. Datepicker (field lives inside the customer dialog)
    $("#customerDate").datepicker();

});