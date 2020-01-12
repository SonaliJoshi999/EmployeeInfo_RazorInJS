using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Sol_EmployeeInfo_RazorInJS.Repository;
using Sol_EmployeeInfo_RazorInJS.ViewModel;

namespace Sol_EmployeeInfo_RazorInJS.Controllers
{
    public class UsersController : Controller
    {
        #region Declaration
        private readonly IUserRepository userRepository = null;
        #endregion

        #region Property
        [BindProperty]
        public UserViewModel UserVM { get; set; }

        [BindProperty(SupportsGet =true)]
        public int Id { get; set; }
        #endregion

        #region Constructor
        public UsersController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
            this.UserVM = new UserViewModel();
        }
        #endregion
        public async Task<IActionResult> Index()
        {
            var userData = (await this.userRepository?.GetUserDetails()).ToList();
            UserVM.UsersList = JsonConvert.SerializeObject(userData);
            return View(UserVM);
        }
        [HttpGet]
        public async Task<IActionResult> OnView()
        {
            var singleUserData = await this.userRepository?.GetSingleUserDetails(this.Id);
            //ViewBag.DataId = Id;
            UserVM.SingleUserDetails = JsonConvert.SerializeObject(singleUserData);
            return View(UserVM);
        }
    }
}