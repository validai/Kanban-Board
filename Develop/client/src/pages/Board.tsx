import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DroppableProvided } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import auth from "../utils/auth";
import { retrieveTickets, updateTicket } from "../api/ticketAPI";
import Swimlane from "../components/Swimlane";

interface Ticket {
  id: number;
  status: string;
  title: string;
}

interface ApiMessage {
  message: string;
}

interface TicketData {
  name: string;
  description: string;
  assignedUserId: string;
  assignedUser: string;
  message?: string;
}

const Board = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const boardStatuses = ["To Do", "In Progress", "Done"];

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await retrieveTickets();
        setTickets(data);
      } catch (err) {
        console.error("Failed to retrieve tickets", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTickets = [...tickets];
    const [movedTicket] = updatedTickets.splice(source.index, 1);
    movedTicket.status = destination.droppableId;
    updatedTickets.splice(destination.index, 0, movedTicket);

    setTickets(updatedTickets);

    try {import { Request, Response } from "express";
    import { User } from "../models/user";
    
    // Fetch all users (excluding passwords)
    export const getAllUsers = async (req: Request, res: Response) => {
      try {
        const users = await User.findAll({ attributes: { exclude: ["password"] } });
        res.json(users);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    };
    
    // Fetch a user by ID
    export const getUserById = async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        return res.json(user);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    };
    
    // Create a new user
    export const createUser = async (req: Request, res: Response) => {
      try {
        const { username, password } = req.body;
        const newUser = await User.create({ username, password });
        res.status(201).json(newUser);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    };
    
    // Update user details
    export const updateUser = async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { username, password } = req.body;
    
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        await user.update({ username, password });
    
        return res.json({ message: "User updated successfully" });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    };
    
    // Delete a user
    export const deleteUser = async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const user = await User.findByPk(id);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        await user.destroy();
        return res.json({ message: "User deleted successfully" });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    };
    
    // Export all functions
    export default {
      getAllUsers,
      getUserById,
      createUser,
      updateUser,
      deleteUser,
    };
    
      await updateTicket(movedTicket.id, { status: movedTicket.status });
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  const handleDeleteTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const response = await updateTicket(ticketId, { deleted: true });
      return response;
    } catch (error) {
      console.error("Error deleting ticket:", error);
      throw error;
    }
  };

  if (!auth.loggedIn()) {
    return (
      <div>
        <h2>⚠️ Login to create & view tickets</h2>
      </div>
    );
  }

  if (error) return <ErrorPage />;

  return (
    <div className="board">
      <button type="button" id="create-ticket-link">
        <Link to="/create">➕ New Ticket</Link>
      </button>

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board-display">
            {boardStatuses.map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided: DroppableProvided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <h2>{status}</h2>
                    {tickets
                      .filter((ticket) => ticket.status === status)
                      .map((ticket, index) => (
                        <Draggable key={ticket.id} draggableId={ticket.id.toString()} index={index}>
                          {(provided: DraggableProvided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <Swimlane title={ticket.title} tickets={[ticket]} deleteTicket={handleDeleteTicket} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Board;
