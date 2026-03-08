// ─── User ─────────────────────────────────────────────────────────────────────
export enum Role {
    User = 'user',
    Admin = 'admin',
}

// ─── Medical Records ──────────────────────────────────────────────────────────
export enum RecordStatus {
    Pending = 'pending',
    Processing = 'processing',
    Completed = 'completed',
    Failed = 'failed',
}

export enum IndicatorStatus {
    Normal = 'normal',
    Low = 'low',
    High = 'high',
    Critical = 'critical',
}

// ─── AI Analysis ──────────────────────────────────────────────────────────────
export enum HealthScoreLevel {
    Excellent = 'excellent',
    Good = 'good',
    Warning = 'warning',
    Danger = 'danger',
}

export enum WarningLevel {
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger',
}

export enum AdviceCategory {
    Diet = 'diet',
    Exercise = 'exercise',
    Medication = 'medication',
    Lifestyle = 'lifestyle',
    Monitoring = 'monitoring',
}

// ─── Notifications ────────────────────────────────────────────────────────────
export enum NotificationType {
    Info = 'info',
    Warning = 'warning',
    Success = 'success',
    Error = 'error',
}

// ─── Gender ───────────────────────────────────────────────────────────────────
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
