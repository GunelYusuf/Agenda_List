using System;
namespace Agenda_List.Application.Dto.AgendaDto
{
    public class AgendaResponseDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Label { get; set; }

        public Int64 day { get; set; }
    }
}
