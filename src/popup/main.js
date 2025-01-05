import { db } from "./firebase_config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const auth = getAuth();
let users = [];

const usersCollection = collection(db, "users");

function updateLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';
    if (users.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 2;
        cell.textContent = 'Add your friend\'s LeetCode ID below to keep track';
        cell.style.textAlign = 'center';
        row.appendChild(cell);
        leaderboardBody.appendChild(row);
    } else {
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.problemsSolvedToday}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }
}

async function fetchFriends() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
    const user = auth.currentUser;
    if (user) {
        try {
            const q = query(usersCollection, where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);
            users = await Promise.all(querySnapshot.docs.map(async doc => {
                const userData = doc.data();
                const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${userData.name}`);
                const data = await response.json();
                if (data.errors) {
                    console.error(`Error fetching data for user ${userData.name}`);
                    return userData;
                } else {
                    const now = new Date();
                    const startOfDayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
                    const uniqueProblems = new Set();
                    const problemsSolvedToday = data.recentSubmissions.filter(submission => {
                        const submissionDate = new Date(submission.timestamp * 1000);
                        if (submissionDate >= startOfDayUTC && submission.statusDisplay === 'Accepted') {
                            if (!uniqueProblems.has(submission.titleSlug)) {
                                uniqueProblems.add(submission.titleSlug);
                                return true;
                            }
                        }
                        return false;
                    }).length;
                    return {
                        ...userData,
                        problemsSolvedToday
                    };
                }
            }));
            updateLeaderboard();
        } catch (error) {
            console.error('Error fetching friends: ', error);
        } finally {
            spinner.style.display = 'none';
        }
    } else {
        console.log('No user is signed in');
        spinner.style.display = 'none';
    }
}

document.getElementById('addUserBtn').addEventListener('click', async () => {
    const leetcodeId = document.getElementById('leetcodeId').value;
    const addUserBtn = document.getElementById('addUserBtn');
    if (leetcodeId) {
        // Check for duplicate users
        if (users.some(user => user.name === leetcodeId)) {
            alert('User already exists in the leaderboard');
            return;
        }

        // Set loading state
        addUserBtn.textContent = 'Adding...';
        addUserBtn.disabled = true;

        try {
            // Fetch problems solved from the API
            const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeId}`);
            const data = await response.json();

            if (data.errors) {
                console.error('User does not exist');
                alert('User does not exist');
            } else {
                const problemsSolved = data.totalSolved;
                const now = new Date();
                const startOfDayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
                const uniqueProblems = new Set();
                const problemsSolvedToday = data.recentSubmissions.filter(submission => {
                    const submissionDate = new Date(submission.timestamp * 1000);
                    if (submissionDate >= startOfDayUTC && submission.statusDisplay === 'Accepted') {
                        if (!uniqueProblems.has(submission.titleSlug)) {
                            uniqueProblems.add(submission.titleSlug);
                            return true;
                        }
                    }
                    return false;
                }).length;

                const newUser = {
                    name: leetcodeId,
                    problemsSolved: problemsSolved,
                    problemsSolvedToday: problemsSolvedToday
                };
                users.push(newUser);
                updateLeaderboard();
                document.getElementById('leetcodeId').value = '';

                // Add user data to Firestore
                const user = auth.currentUser;
                if (user) {
                    await addDoc(usersCollection, {
                        uid: user.uid,
                        name: newUser.name,
                        problemsSolved: newUser.problemsSolved,
                        problemsSolvedToday: newUser.problemsSolvedToday,
                        timestamp: new Date()
                    });
                    console.log('User data added to Firestore');
                } else {
                    console.log('No user is signed in');
                }
            }
        } catch (error) {
            console.error('Error fetching data or adding document: ', error);
        } finally {
            // Revert loading state
            addUserBtn.textContent = 'Add User';
            addUserBtn.disabled = false;
        }
    }
});

// Fetch friends on initial load and on auth state change
document.addEventListener('DOMContentLoaded', async () => {
    // Ensure fetchFriends is called when the extension is opened
    if (auth.currentUser) {
        await fetchFriends();
    }

    onAuthStateChanged(auth, user => {
        if (user) {
            fetchFriends();
        } else {
            console.log('No user is signed in');
        }
    });
});