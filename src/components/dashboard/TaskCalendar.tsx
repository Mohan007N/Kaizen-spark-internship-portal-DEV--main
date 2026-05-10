import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, parseISO } from "date-fns";

interface Task {
  id: string;
  title: string;
  deadline: string;
  status: string;
  difficulty?: string;
}

interface TaskCalendarProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export function TaskCalendar({ tasks, onTaskClick }: TaskCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get tasks for a specific day
  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => {
      try {
        const taskDate = parseISO(task.deadline);
        return isSameDay(taskDate, day);
      } catch {
        return false;
      }
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "submitted":
      case "under_review":
        return "bg-cyan/20 text-cyan border-cyan/30";
      case "in_progress":
        return "bg-blue-tint/20 text-blue-tint border-blue-tint/30";
      case "rejected":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-white/5 text-muted-foreground border-white/10";
    }
  };

  // Navigate months
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  // Get day of week for first day to calculate offset
  const firstDayOfWeek = monthStart.getDay();

  return (
    <div className="glass-strong rounded-2xl p-6 border-gradient">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-blue-tint grid place-items-center">
            <CalendarIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
            <p className="text-xs text-muted-foreground">Task deadline calendar</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 rounded-lg glass hover:bg-white/5 transition-colors text-xs font-medium"
          >
            Today
          </button>
          <button
            onClick={previousMonth}
            className="h-8 w-8 rounded-lg glass hover:bg-white/5 transition-colors grid place-items-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextMonth}
            className="h-8 w-8 rounded-lg glass hover:bg-white/5 transition-colors grid place-items-center"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Calendar days */}
        {daysInMonth.map((day) => {
          const dayTasks = getTasksForDay(day);
          const isCurrentDay = isToday(day);
          const hasDeadlines = dayTasks.length > 0;

          return (
            <div
              key={day.toISOString()}
              className={`
                aspect-square rounded-lg glass p-2 relative overflow-hidden
                ${isCurrentDay ? "ring-2 ring-cyan shadow-glow-cyan" : ""}
                ${hasDeadlines ? "hover:bg-white/5 cursor-pointer" : ""}
                transition-all
              `}
            >
              {/* Day number */}
              <div
                className={`
                  text-xs font-semibold mb-1
                  ${isCurrentDay ? "text-cyan" : "text-foreground"}
                  ${!isSameMonth(day, currentMonth) ? "opacity-30" : ""}
                `}
              >
                {format(day, "d")}
              </div>

              {/* Task indicators */}
              {hasDeadlines && (
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <button
                      key={task.id}
                      onClick={() => onTaskClick?.(task)}
                      className={`
                        w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium
                        border truncate ${getStatusColor(task.status)}
                        hover:scale-105 transition-transform
                      `}
                      title={task.title}
                    >
                      {task.title}
                    </button>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-[9px] text-muted-foreground text-center">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="text-xs font-semibold text-muted-foreground mb-3">Status Legend</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
            <span className="text-xs text-muted-foreground">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-cyan/30 border border-cyan/50" />
            <span className="text-xs text-muted-foreground">Submitted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-tint/30 border border-blue-tint/50" />
            <span className="text-xs text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="glass rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-gradient">
            {tasks.filter((t) => t.status === "approved").length}
          </div>
          <div className="text-[10px] text-muted-foreground">Completed</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-cyan">
            {tasks.filter((t) => t.status === "in_progress" || t.status === "submitted").length}
          </div>
          <div className="text-[10px] text-muted-foreground">Active</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-muted-foreground">
            {tasks.filter((t) => t.status === "assigned").length}
          </div>
          <div className="text-[10px] text-muted-foreground">Pending</div>
        </div>
      </div>
    </div>
  );
}
