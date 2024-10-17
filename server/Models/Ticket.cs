public class Ticket
{
    public int TicketID { get; set; }
    public required string Description { get; set; }
    public required string Status { get; set; }  // "Open" or "Closed"
    public DateTime Date { get; set; }
}
