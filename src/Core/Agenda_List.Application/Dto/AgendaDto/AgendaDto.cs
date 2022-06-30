using System;
using System.ComponentModel.DataAnnotations;

namespace Agenda_List.Application.Dto.AgendaDto
{
    public class AgendaDto
    {
        public Guid? Id { get; set; }

        [Required, MaxLength(20)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string Label { get; set; }


        [Required,RegularExpression(@"^(\d{13})?$")]
        public Int64? day { get; set; }
    }
}
