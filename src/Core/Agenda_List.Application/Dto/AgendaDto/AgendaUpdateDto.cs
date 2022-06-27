using System;
using System.ComponentModel.DataAnnotations;

namespace Agenda_List.Application.Dto.AgendaDto
{
    public class AgendaUpdateDto
    {
        public Guid Id { get; set; }

        [Required, MaxLength(20)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string Label { get; set; }

    }
}
