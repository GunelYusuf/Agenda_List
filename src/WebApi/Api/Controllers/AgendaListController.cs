using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Agenda_List.Application.Dto.AgendaDto;
using Agenda_List.Application.Repositories.AgendaList;
using Agenda_List.Domain.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AgendaListController : ControllerBase
    {
        private readonly IAgendaListReadRepository _agendaListRead;
        private readonly IAgendaListWriteRepository _agendaListWrite;
        private readonly IMapper _mapper;

        public AgendaListController(IAgendaListReadRepository agendaListRead, IAgendaListWriteRepository agendaListWrite, IMapper mapper)
        {
            _agendaListRead = agendaListRead;
            _agendaListWrite = agendaListWrite;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create(AgendaDto agendaDto)
        {
            Agenda agenda = _mapper.Map<Agenda>(agendaDto);
            await _agendaListWrite.AddAsync(agenda);
            var result = await _agendaListWrite.SaveAsync()>0;
            if(result) return Ok();
            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAgenda()
        {
            var agenda = _agendaListRead.GetAll();
            if (agenda == null) return NotFound();

            return Ok(agenda);
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            Agenda agenda = await _agendaListRead.GetByIdAsync(id.ToString());
            bool success = _agendaListWrite.Remove(agenda);
            if (success) await _agendaListWrite.SaveAsync();
            else return BadRequest(new ProblemDetails { Title = "An error occurred while deleting the event" });
            return Ok("Event successfully deleted");

        }

        [HttpPut]
        public async Task<IActionResult> Put(AgendaUpdateDto agendaUpdateDto)
        {
            Agenda updateEvent = await _agendaListRead.GetByIdAsync(agendaUpdateDto.Id.ToString());
            if (updateEvent == null) return NotFound();
            updateEvent.Title = agendaUpdateDto.Title;
            updateEvent.Description = agendaUpdateDto.Description;
            updateEvent.Label = agendaUpdateDto.Label;
            if ( _agendaListWrite.Update(updateEvent))
            {
                await _agendaListWrite.SaveAsync();
                return Ok();
            }
            else
            {
                return BadRequest("Sorry, We have problem");
            }


        }
    }
}
