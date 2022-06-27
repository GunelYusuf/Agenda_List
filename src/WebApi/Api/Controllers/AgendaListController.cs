using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Agenda_List.Application.Repositories.AgendaList;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AgendaListController : ControllerBase
    {
        private readonly IAgendaListReadRepository _agendaListRead;
        private readonly IAgendaListWriteRepository _agendaListWrite;

        public AgendaListController(IAgendaListReadRepository agendaListRead, IAgendaListWriteRepository agendaListWrite)
        {
            _agendaListRead = agendaListRead;
            _agendaListWrite = agendaListWrite;
        }

        // GET: /<controller>/
        public async Task<IActionResult> Create()
        {
            return Ok();
        }
    }
}
