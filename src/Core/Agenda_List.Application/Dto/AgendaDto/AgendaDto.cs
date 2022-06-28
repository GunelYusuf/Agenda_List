using System;
using System.ComponentModel.DataAnnotations;

namespace Agenda_List.Application.Dto.AgendaDto
{
    public class AgendaDto
    {
        [Required, MaxLength(20)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string Label { get; set; }

        public Int64 day { get; set; }
    }
}
