// User List
/// <reference path="../lib/razor/raz.js"/>
/// <reference path="../lib/jquery/dist/jquery.js"/>

function userListTemplateRender() {

    // Private Method
    let userListTemplate = async function () {
        return await new Promise((resolve) => {

            var template = `
                
                @{
                    console.log(Model.length);
                }

                <table class='table table-striped table-sm' style='grid-row-gap:3px;'>
                    <thead style='background-color:#1668bb;color:white;'>
                        <tr>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Age
                            </th>
                            <th>
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @for (var i=0;i<=Model.length-1;i++) {

                            var userModel=Model[i];
                            console.log(userModel);
                            var onViewUrl="/Users/OnView/" + userModel.Id;

                            <tr>
                                <td>@userModel.FirstName</td>
                                <td>@userModel.LastName</td>
                                <td>@userModel.Age</td>
                                <td>
                                    <a class='btn btn-primary btn-sm' href="@onViewUrl">View</a>
                                </td>
                            </tr>   
                        }
                    </tbody>

                </table>


            `;

            return resolve(template);

        });

    };

    this.render = async function () {

        return await new Promise(async (resolve) => {

            // get User List Json Value from divUserTable
            var userListArray = $("#divUserTable").data("userlist");
            console.log(userListArray);

            // get User Table ka Template
            var getTableTemplate = await userListTemplate();
            //console.log(getTableTemplate);

            // render HTML
            var renderUsersTables = raz.render(getTableTemplate, userListArray);

            $("#divUserTable").append(renderUsersTables);

            return resolve(true);
        });
    }
}

function onUserListDisplay() {

    var userListTemplateRenderObj = new userListTemplateRender();
    userListTemplateRenderObj
        .render()
        .then((resolve) => console.log(resolve));

}

onUserListDisplay();