// User List
/// <reference path="../lib/razor/raz.js"/>
/// <reference path="../lib/jquery/dist/jquery.js"/>

function singleUserTemplateRender() {
    let singleUserTemplate = async function () {
        return await new Promise((resolve) => {

            var template = `
                @{
                    console.log(Model.length);
                }
               
                @{
                var userModel=Model;
                console.log(userModel);
                console.log((userModel.ImageURL).replace("~/", "../../"));
                var userImage=(userModel.ImageURL).replace("~/", "../../");
                var onViewUrl="/Users/Index";
                }
                
                <div class='card mb-4' style='max-width: 540px;border-width:1px;border-color:lightblue;'>
                    <div class='row no-gutters' style='border:solid;border-width:1px;border-color:lightblue;'>
                        <div class='col-md-4'>
                            <center>
                                <img src='@userImage' style='border:none; height:100px;height:100px;' alt='No Image'>
                            </center>
                        </div>
                        <div class='col-md-8' style='background-color:lightseagreen;text-align:center;'>
                            <div class='card-body'>
                                <h5 class='card-title' style='color:white;'>@userModel.FirstName @userModel.LastName</h5>
                                <p class='card-text' style='color:white;'>@userModel.Designation</p>
                            </div>
                        </div>
                    </div>
                    <div class='row no-gutters' style='border:solid;border-width:1px;border-color:lightblue;'>
                        <div class='col-md-6' style='border:solid;border-width:1px;border-color:lightblue;'>
                            <div class='card-body'>
                                <p class='card-text' style='text-align:center;'>Age: @userModel.Age <span>Yrs</span></p>
                            </div>
                        </div>
                        <div class='col-md-6' style='text-align:center;border:solid;border-width:1px;border-color:lightblue;'>
                            <div class='card-body'>
                                <p class='card-text'>Department : @userModel.Department</p>
                            </div>
                        </div>
                    </div>
                    <div class='card-body' style='border:solid;border-width:1px;border-color:lightblue;'>
                        <p class='card-text' style='text-align:center;'>Address : @userModel.Address</p>
                    </div>
                    <div class='card-body' style='border:solid;border-width:1px;border-color:lightblue;'>
                        <center>
                            <a class='btn btn-primary' style='color:white; font-weight:bold' href="@onViewUrl">Back</a>
                        </center>
                    </div>
                </div>
                `;
            return resolve(template);

        });

    };

    this.render = async function () {

        return await new Promise(async (resolve) => {

            // get User List Json Value from divUserCard
            var singleUser = $("#divUserCard").data("singluserinfo");
            console.log(singleUser);

            // get User Table ka Template
            var getCardTemplate = await singleUserTemplate();
            console.log(getCardTemplate);

            // render HTML
            var renderUser = raz.render(getCardTemplate, singleUser);

            $("#divUserCard").append(renderUser);

            return resolve(true);
        });
    }
}

function onUserDataDisplay() {
    
    var userDataTemplateRenderObj = new singleUserTemplateRender();
    userDataTemplateRenderObj
        .render()
        .then((resolve) => console.log(resolve));

}

onUserDataDisplay();

