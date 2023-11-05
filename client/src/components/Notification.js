import io from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:5555/notifications'); 

socket.on('status_changed', (data) => {
    const { record_id, new_status } = data;
    showNotification(`Record ${record_id} status changed to ${new_status}`);
    sendEmailNotification(new_status);
    fetchNotifications();
});

function showNotification(message) {
    // Display the notification to the user (implement your UI logic here)
}

function sendEmailNotification(newStatus) {
    // Simulate sending an email notification.
    // In a real application, you should use an email service or library to send notifications.
    console.log(`Email notification sent: Record status changed to "${newStatus}"`);
}

function fetchNotifications() {
    fetch('/notifications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Process and display the fetched notifications as needed
        console.log("Fetched Notifications:", data);
    })
    .catch(error => {
        console.error('Error fetching notifications:', error);
    });
}

function createNotification(notification, user_id, record_id) {
    const data = {
        notification,
        user_id,
        record_id,
    };

    fetch('/notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Notification created successfully:", data);
    })
    .catch(error => {
        console.error('Error creating notification:', error);
    });
}

function deleteNotification(id) {
    fetch(`/notifications/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.status === 200) {
            console.log("Notification deleted successfully");
        } else {
            console.error('Error deleting notification');
        }
    })
    .catch(error => {
        console.error('Error deleting notification:', error);
    });
}


