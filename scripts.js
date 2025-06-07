document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const target = button.getAttribute('data-target');
            const targetElement = document.getElementById(target);
            targetElement.classList.add('active');

            // Scroll to the target section smoothly
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
