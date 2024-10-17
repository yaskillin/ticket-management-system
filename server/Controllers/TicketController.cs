using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly TicketDbContext _context;

    public TicketController(TicketDbContext context)
    {
        _context = context;
    }

    // Get all tickets (with pagination)
    [HttpGet]
    public async Task<IActionResult> GetTickets(int page = 1, int pageSize = 10)
    {
        var tickets = await _context.Tickets
                                    .Skip((page - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToListAsync();
        return Ok(tickets);
    }

    // Create a ticket
    [HttpPost]
    public async Task<IActionResult> CreateTicket([FromBody] Ticket ticket)
    {
        ticket.Date = DateTime.Now;
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();
        return Ok(ticket);
    }

    // Update a ticket
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTicket(int id, [FromBody] Ticket updatedTicket)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null) return NotFound();

        ticket.Description = updatedTicket.Description;
        ticket.Status = updatedTicket.Status;
        await _context.SaveChangesAsync();

        return Ok(ticket);
    }

    // Delete a ticket
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null) return NotFound();

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
