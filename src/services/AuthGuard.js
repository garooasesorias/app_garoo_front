// const AuthGuard = ({ component: Component, ...rest }) => {
//   const { isAuthenticated, userRole } = useAuth(); // Implementa la lógica para obtener estos valores

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!isAuthenticated) {
//           // Si no está autenticado, redirige a la página de inicio de sesión
//           return <Redirect to="/login" />;
//         }

//         if (rest.role && rest.role !== userRole) {
//           // Si no tiene el rol requerido, redirige a una página de error o donde prefieras
//           return <Redirect to="/unauthorized" />;
//         }

//         // Si está autenticado y tiene el rol correcto, renderiza el componente
//         return <Component {...props} />;
//       }}
//     />
//   );
// };

// export default AuthGuard;
